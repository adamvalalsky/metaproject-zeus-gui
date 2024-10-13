import { Anchor, Badge, Box, Button, Checkbox, Group, Select, Stack, Text, TextInput, Title } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { notifications } from '@mantine/notifications';
import { HTTPError } from 'ky';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import Loading from '@/components/global/loading';
import ErrorAlert from '@/components/global/error-alert';
import { type AddAttributeSchema, addAttributeSchema } from '@/modules/attribute/form';
import { useCreateAttributeTypeMutation, useDeleteAttributeTypeMutation } from '@/modules/attribute/mutations';
import { useAttributeTypesQuery } from '@/modules/attribute/api/attribute-types';
import { useResourceAttributesQuery } from '@/modules/attribute/api/resource-attributes';

const ResourceAttributesPage = () => {
	const { t } = useTranslation();

	const { data, isPending, isError, refetch } = useResourceAttributesQuery();
	const {
		data: attributeTypes,
		isPending: isAttributeTypesPending,
		isError: isAttributeTypesError
	} = useAttributeTypesQuery();

	const { mutate: addAttributeType, isPending: isAddAttributeTypePending } = useCreateAttributeTypeMutation();
	const { mutate: deleteAttributeType } = useDeleteAttributeTypeMutation();

	const {
		handleSubmit,
		control,
		register,
		formState: { errors },
		reset
	} = useForm<AddAttributeSchema>({
		resolver: zodResolver(addAttributeSchema)
	});

	if (isPending || isAttributeTypesPending) {
		return <Loading />;
	}

	if (isError || isAttributeTypesError) {
		return <ErrorAlert />;
	}

	const removeAttribute = (id: number) => {
		deleteAttributeType(id, {
			onSuccess: () => {
				refetch().then(() => {
					notifications.show({
						color: 'green',
						message: t('routes.ResourceAttributesPage.delete_success')
					});
				});
			},
			onError: async error => {
				if (error instanceof HTTPError) {
					const errorData = await error.response.json();
					notifications.show({
						color: 'red',
						message: errorData.message
					});
				}
			}
		});
	};

	const addAttribute = (data: AddAttributeSchema) => {
		addAttributeType(data, {
			onSuccess: () => {
				refetch().then(() => {
					modals.closeAll();
					reset();
					notifications.show({
						color: 'green',
						message: t('routes.ResourceAttributesPage.add_modal.success')
					});
				});
			}
		});
	};

	const openAddModal = () => {
		modals.open({
			title: t('routes.ResourceAttributesPage.add_modal.title'),
			centered: true,
			size: 'xl',
			children: (
				<form onSubmit={handleSubmit(addAttribute)}>
					<Stack>
						<TextInput
							label={t('routes.ResourceAttributesPage.add_modal.name_input')}
							withAsterisk
							placeholder="Custom attribute"
							{...register('name')}
							error={errors.name?.message}
						/>
						<Controller
							name="attributeTypeId"
							control={control}
							render={({ field }) => (
								<Select
									name={field.name}
									value={field.value?.toString() ?? null}
									label={t('routes.ResourceAttributesPage.add_modal.type_label')}
									placeholder="Select attribute type"
									withAsterisk
									data={
										attributeTypes?.map(item => ({
											value: item.id.toString(),
											label: item.name
										})) ?? []
									}
									onChange={value => {
										if (value) {
											field.onChange(+value);
										}
									}}
								/>
							)}
						/>
						<Checkbox
							label={t('routes.ResourceAttributesPage.add_modal.is_public_label')}
							description={t('routes.ResourceAttributesPage.add_modal.is_public_description')}
							{...register('isPublic')}
						/>
						<Checkbox
							label={t('routes.ResourceAttributesPage.add_modal.is_required_label')}
							description={t('routes.ResourceAttributesPage.add_modal.is_required_description')}
							{...register('isRequired')}
						/>
						<Button loading={isAddAttributeTypePending} type="submit">
							{t('routes.ResourceAttributesPage.add_modal.submit')}
						</Button>
					</Stack>
				</form>
			)
		});
	};

	const valuesToShow = data?.filter(item => !item.name.startsWith('quantity_'));

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: t('components.global.drawerList.links.admin.title'), href: '/admin' },
					{ title: t('components.global.drawerList.links.admin.link.resources'), href: '/admin/resources' },
					{ title: t('routes.ResourceAttributesPage.title'), href: '/admin/resources/attributes' }
				]}
			/>
			<Group justify="space-between">
				<Title order={2}>{t('routes.ResourceAttributesPage.title')}</Title>
				<Group>
					<Button onClick={openAddModal} leftSection={<IconPlus />}>
						{t('routes.ResourceAttributesPage.add_button')}
					</Button>
				</Group>
			</Group>
			<Stack mt={20} gap={15}>
				{valuesToShow.map(item => (
					<Stack gap={0} key={item.id}>
						<Group>
							<Text>{item.name}</Text>
							{item.isPublic && (
								<Badge color="yellow" size="sm">
									Public
								</Badge>
							)}
							{item.isRequired && (
								<Badge color="lime" size="sm">
									Required
								</Badge>
							)}
						</Group>
						<Group>
							<Text size="sm" c="dimmed">
								Type: {item.attributeType.name}
							</Text>
							{!item.hasResources && (
								<Anchor size="sm" c="red" onClick={() => removeAttribute(item.id)}>
									Delete <IconTrash size={13} />
								</Anchor>
							)}
						</Group>
					</Stack>
				))}
			</Stack>
		</Box>
	);
};

export default ResourceAttributesPage;
