import { Box, Button, Checkbox, Group, NumberInput, Select, Textarea, TextInput, Title } from '@mantine/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { useResourceAttributesQuery, useResourceListQuery, useResourceTypesQuery } from '@/modules/allocation/queries';
import Loading from '@/components/global/loading';
import ErrorAlert from '@/components/global/error-alert';
import { addResourceSchema, type AddResourceSchema } from '@/modules/allocation/form';
import { useCreateResourceMutation } from '@/modules/allocation/mutations';
import { type Resource } from '@/modules/allocation/model';
import { type Attribute } from '@/modules/attribute/model';
import CustomAttributes from '@/components/resource/attributes/custom-attributes';

const ResourceAddPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [quantitySelect, setQuantitySelect] = useState(false);
	const [quantityLabel, setQuantityLabel] = useState<string | null>(null);
	const [quantityDefaultValue, setQuantityDefaultValue] = useState<string | null>(null);
	const [attributes, setAttributes] = useState<Attribute[]>([]);
	const [parentResources, setParentResources] = useState<Resource[]>([]);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<AddResourceSchema>({
		resolver: zodResolver(addResourceSchema)
	});

	const { mutate, isPending } = useCreateResourceMutation();
	const {
		data: resourceTypes,
		isPending: isResourceTypePending,
		isError: isResourceTypeError
	} = useResourceTypesQuery();
	const { data: resources, isPending: isResourcesPending, isError: isResourcesError } = useResourceListQuery();
	const {
		data: resourceAttributes,
		isPending: isAttributesPending,
		isError: isAttributesError
	} = useResourceAttributesQuery();

	if (isResourceTypePending || isResourcesPending || isAttributesPending) {
		return <Loading />;
	}

	if (isResourceTypeError || isResourcesError || isAttributesError) {
		return <ErrorAlert />;
	}

	const onSubmit = (data: AddResourceSchema) => {
		const chosenAttributes = [...attributes];

		if (quantitySelect && quantityLabel && quantityDefaultValue) {
			chosenAttributes.push({
				key: 'quantity_label',
				value: quantityLabel
			});
			chosenAttributes.push({
				key: 'quantity_default_value',
				value: quantityDefaultValue
			});
		}

		mutate(
			{
				...data,
				attributes: chosenAttributes
			},
			{
				onSuccess: () => {
					notifications.show({
						message: t('routes.ResourceAddPage.notifications.success.message'),
						color: 'green'
					});
					queryClient
						.refetchQueries({
							queryKey: ['resource']
						})
						.then(() => {
							navigate('/admin/resources');
						});
				},
				onError: () => {
					notifications.show({
						message: t('routes.ResourceAddPage.notifications.error.message'),
						color: 'red'
					});
				}
			}
		);
	};

	return (
		<Box>
			<PageBreadcrumbs
				links={[
					{ title: t('components.global.drawerList.links.admin.title'), href: '/admin' },
					{ title: t('components.global.drawerList.links.admin.link.resources'), href: '/admin/requests' },
					{ title: t('routes.ResourceAddPage.title'), href: '/admin/resources/add' }
				]}
			/>
			<Title order={2}>{t('routes.ResourceAddPage.title')}</Title>
			<Box mt={15}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextInput
						my={10}
						label="Name"
						withAsterisk
						placeholder="Resource name"
						{...register('name')}
						error={errors.name?.message}
					/>
					<Textarea
						label="Description"
						withAsterisk
						placeholder="Resource description"
						{...register('description')}
						error={errors.description?.message}
					/>
					<Controller
						control={control}
						name="resourceTypeId"
						render={({ field }) => (
							<Select
								my={10}
								name={field.name}
								withAsterisk
								label={t('routes.ResourceAddPage.form.type.label')}
								placeholder={t('routes.ResourceAddPage.form.type.placeholder')}
								allowDeselect={false}
								data={resourceTypes.map(option => ({
									value: option.id.toString(),
									label: option.name
								}))}
								onChange={value => {
									if (value) {
										field.onChange(+value);
										setParentResources(
											resources?.filter(resource => resource.resourceType.id === +value) ?? []
										);
									}
								}}
								error={errors.resourceTypeId?.message}
							/>
						)}
					/>
					{parentResources.length > 0 && (
						<Controller
							control={control}
							name="parentResourceId"
							render={({ field }) => (
								<Select
									my={10}
									name={field.name}
									label={t('routes.ResourceAddPage.form.resource.label')}
									description={t('routes.ResourceAddPage.form.resource.description')}
									placeholder={t('routes.ResourceAddPage.form.resource.placeholder')}
									allowDeselect={false}
									data={parentResources.map(option => ({
										value: option.id.toString(),
										label: option.name
									}))}
									onChange={value => (value ? field.onChange(+value) : null)}
									error={errors.parentResourceId?.message}
								/>
							)}
						/>
					)}
					<Checkbox
						my={10}
						label={t('routes.ResourceAddPage.form.is_available.label')}
						description={t('routes.ResourceAddPage.form.is_available.description')}
						defaultChecked
						{...register('isAvailable')}
						error={errors.isAvailable?.message}
					/>
					<Box my={20}>
						<Checkbox
							checked={quantitySelect}
							onChange={() => {
								setQuantitySelect(!quantitySelect);
							}}
							my={10}
							label={t('routes.ResourceAddPage.form.allow_quantity.label')}
							description={t('routes.ResourceAddPage.form.allow_quantity.description')}
						/>
						{quantitySelect && (
							<Group grow my={10}>
								<TextInput
									label={t('routes.ResourceAddPage.form.quantity_label.label')}
									description={t('routes.ResourceAddPage.form.quantity_label.description')}
									withAsterisk
									placeholder={t('routes.ResourceAddPage.form.quantity_label.placeholder')}
									onChange={e => setQuantityLabel(e.currentTarget.value)}
								/>
								<NumberInput
									label={t('routes.ResourceAddPage.form.quantity_default.label')}
									description={t('routes.ResourceAddPage.form.quantity_default.description')}
									withAsterisk
									placeholder={t('routes.ResourceAddPage.form.quantity_default.placeholder')}
									min={0}
									onChange={value => {
										setQuantityDefaultValue(value.toString());
									}}
								/>
							</Group>
						)}
					</Box>
					<CustomAttributes
						attributes={resourceAttributes}
						setAttributes={attributes => setAttributes(attributes)}
					/>
					<Button loading={isPending} type="submit">
						{t('routes.ResourceAddPage.form.submit')}
					</Button>
				</form>
			</Box>
		</Box>
	);
};

export default ResourceAddPage;
