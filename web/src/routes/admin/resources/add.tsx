import {
	ActionIcon,
	Anchor,
	Box,
	Button,
	Checkbox,
	Group,
	NumberInput,
	Select,
	Stack,
	Text,
	Textarea,
	TextInput,
	Title
} from '@mantine/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

import PageBreadcrumbs from '@/components/global/page-breadcrumbs';
import { useResourceAttributesQuery, useResourceListQuery, useResourceTypesQuery } from '@/modules/allocation/queries';
import Loading from '@/components/global/loading';
import ErrorAlert from '@/components/global/error-alert';
import { addResourceSchema, type AddResourceSchema } from '@/modules/allocation/form';
import { useCreateResourceMutation } from '@/modules/allocation/mutations';
import { type Resource } from '@/modules/allocation/model';
import AttributeInput from '@/components/resource/attributes/attribute-input';

type Attribute = {
	key: string;
	value: string;
	type?: string;
	index?: number;
};

const ResourceAddPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [quantitySelect, setQuantitySelect] = useState(false);
	const [attributes, setAttributes] = useState<Attribute[]>([]);
	const [parentResources, setParentResources] = useState<Resource[]>([]);
	const [optionalAttributes, setOptionalAttributes] = useState<Attribute[]>([]);

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
		const values = {
			...data,
			attributes: [
				...attributes.map(attribute => ({ key: attribute.key, value: attribute.value })),
				...optionalAttributes.map(attribute => ({
					key: attribute.key,
					value: attribute.value
				}))
			]
		};
		mutate(values, {
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
		});
	};

	const addAttribute = (key: string, value: string, type?: string) => {
		if (attributes.find(attribute => attribute.key === key)) {
			setAttributes(attributes.map(attribute => (attribute.key === key ? { key, value, type } : attribute)));
		} else {
			setAttributes([...attributes, { key, value, type }]);
		}
	};

	const addOptionalAttribute = (key: string, value: string, index: number) => {
		if (index >= optionalAttributes.length) {
			setOptionalAttributes([...optionalAttributes, { key, value, index }]);
		} else {
			const type = resourceAttributes.find(a => a.name === key)?.attributeType.name;
			setOptionalAttributes(optionalAttributes =>
				optionalAttributes.map(attribute =>
					attribute.index === index ? { key, value, index, type } : attribute
				)
			);
		}
	};

	const removeOptionalAttribute = (index?: number) => {
		if (index === undefined) {
			return;
		}

		setOptionalAttributes(optionalAttributes =>
			optionalAttributes
				.filter(attribute => attribute.index !== index)
				.map((attribute, i) => ({ ...attribute, index: i }))
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
								if (quantitySelect) {
									setAttributes(
										attributes.filter(
											attribute =>
												attribute.key !== 'quantity_label' &&
												attribute.key !== 'quantity_default_value'
										)
									);
								}
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
									onChange={e => addAttribute('quantity_label', e.currentTarget.value)}
								/>
								<NumberInput
									label={t('routes.ResourceAddPage.form.quantity_default.label')}
									description={t('routes.ResourceAddPage.form.quantity_default.description')}
									withAsterisk
									placeholder={t('routes.ResourceAddPage.form.quantity_default.placeholder')}
									min={0}
									onChange={value => {
										addAttribute('quantity_default_value', value.toString());
									}}
								/>
							</Group>
						)}
					</Box>
					{resourceAttributes && (
						<Box my={20}>
							<Title order={4}>{t('routes.ResourceAddPage.form.custom_attributes.title')}</Title>
							<Text c="dimmed">{t('routes.ResourceAddPage.form.custom_attributes.description')}</Text>
							<Group>
								{resourceAttributes
									?.filter(a => a.isRequired)
									.map(a => (
										<Group key={a.id}>
											<AttributeInput label={a.name} type={a.attributeType.name} />
										</Group>
									))}
							</Group>
							<Stack>
								<Anchor onClick={() => addOptionalAttribute('', '', optionalAttributes.length)}>
									<Group gap={5}>
										<ActionIcon size={16}>
											<IconPlus />
										</ActionIcon>
										{t('routes.ResourceAddPage.form.custom_attributes.button')}
									</Group>
								</Anchor>
								<Stack>
									{optionalAttributes.map(attribute => (
										<Group key={attribute.index}>
											<Select
												value={attribute.key ? attribute.key : null}
												onChange={value => {
													if (value && attribute.index !== undefined) {
														addOptionalAttribute(value, '', attribute.index);
													}
												}}
												data={resourceAttributes
													.filter(a => !a.isRequired)
													.filter(a => {
														if (attribute.index === undefined) {
															return true;
														}

														if (optionalAttributes[attribute.index]?.key === a.name) {
															return true;
														}

														return !optionalAttributes.find(o => o.key === a.name);
													})
													.map(a => ({
														value: a.name,
														label: a.name
													}))}
											/>
											{attribute.key && attribute.type && (
												<AttributeInput
													label=""
													type={attribute.type}
													onChange={value => {
														if (attribute.index !== undefined) {
															addOptionalAttribute(attribute.key, value, attribute.index);
														}
													}}
												/>
											)}
											<ActionIcon
												variant="transparent"
												c="red"
												onClick={() => removeOptionalAttribute(attribute.index)}
											>
												<IconTrash />
											</ActionIcon>
										</Group>
									))}
								</Stack>
							</Stack>
							<Text size="sm" c="red">
								{errors.attributes?.message}
							</Text>
						</Box>
					)}
					<Button loading={isPending} type="submit">
						{t('routes.ResourceAddPage.form.submit')}
					</Button>
				</form>
			</Box>
		</Box>
	);
};

export default ResourceAddPage;
