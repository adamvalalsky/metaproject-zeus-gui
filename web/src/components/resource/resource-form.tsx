import { Box, Button, Checkbox, Group, NumberInput, Select, Textarea, TextInput } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import CustomAttributes from '@/components/resource/attributes/custom-attributes';
import type { Resource } from '@/modules/allocation/model';
import { type Attribute } from '@/modules/attribute/model';
import { useResourceAttributesQuery, useResourceListQuery, useResourceTypesQuery } from '@/modules/allocation/queries';
import Loading from '@/components/global/loading';
import ErrorAlert from '@/components/global/error-alert';
import { type AddResourceSchema } from '@/modules/allocation/form';

type ResourceFormProps = {
	isPending: boolean;
	attributes: Attribute[];
	setAttributes: (attributes: Attribute[]) => void;
	onSubmit: (data: AddResourceSchema) => void;
};

const ResourceForm = ({ isPending, attributes, setAttributes, onSubmit }: ResourceFormProps) => {
	const { t } = useTranslation();
	const [parentResources, setParentResources] = useState<Resource[]>([]);
	const [quantitySelect, setQuantitySelect] = useState(false);
	const [quantityLabel, setQuantityLabel] = useState<string | null>(null);
	const [quantityDefaultValue, setQuantityDefaultValue] = useState<string | null>(null);

	const {
		handleSubmit,
		register,
		formState: { errors },
		control
	} = useFormContext<AddResourceSchema>();

	const beforeSubmit = (data: AddResourceSchema) => {
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

		onSubmit({
			...data,
			attributes: chosenAttributes
		});
	};

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

	return (
		<form onSubmit={handleSubmit(beforeSubmit)}>
			<TextInput
				my={10}
				label="Name"
				withAsterisk
				placeholder="Resource name"
				{...register('name')}
				error={errors.name?.message as string}
			/>
			<Textarea
				label="Description"
				withAsterisk
				placeholder="Resource description"
				{...register('description')}
				error={errors.description?.message as string}
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
						error={errors.resourceTypeId?.message as string}
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
							error={errors.parentResourceId?.message as string}
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
				error={errors.isAvailable?.message as string}
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
			<CustomAttributes attributes={resourceAttributes} setAttributes={attributes => setAttributes(attributes)} />
			<Button loading={isPending} type="submit">
				{t('routes.ResourceAddPage.form.submit')}
			</Button>
		</form>
	);
};

export default ResourceForm;
