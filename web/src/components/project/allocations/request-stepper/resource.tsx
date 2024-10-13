import { Box, Button, NumberInput, Select, Stack, Textarea } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import React from 'react';

import Loading from '@/components/global/loading';
import ErrorAlert from '@/components/global/error-alert';
import { QUANTITY_DEFAULT_VALUE, QUANTITY_LABEL } from '@/modules/attribute/constant';
import { type Resource } from '@/modules/resource/model';
import { useResourceDetailQuery } from '@/modules/resource/api/resource-detail';

type ResourceStepProps = {
	resources: Resource[];
	selectedResourceId: number | null;
	setSelectedResourceId: (id: number) => void;
	isPending: boolean;
};

const ResourceStep = ({ resources, setSelectedResourceId, selectedResourceId, isPending }: ResourceStepProps) => {
	const form = useFormContext();
	const { t } = useTranslation();

	const {
		data: resourceDetail,
		fetchStatus,
		isPending: isDetailPending,
		isError: isDetailError
	} = useResourceDetailQuery(selectedResourceId);

	if (!resources) {
		return null;
	}

	if (isDetailPending && fetchStatus === 'fetching') {
		return <Loading />;
	}

	if (isDetailError) {
		return <ErrorAlert />;
	}

	const quantityLabel = resourceDetail?.attributes.find(attribute => attribute.key === QUANTITY_LABEL)?.value;
	const quantityDefaultValue = resourceDetail?.attributes.find(
		attribute => attribute.key === QUANTITY_DEFAULT_VALUE
	)?.value;

	return (
		<Stack>
			<Box>
				<Controller
					control={form.control}
					name="resourceId"
					defaultValue={selectedResourceId?.toString() ?? null}
					render={({ field }) => (
						<Select
							name={field.name}
							value={field.value}
							label={t('components.resourceStepper.resource.resource.label')}
							withAsterisk
							data={resources.map(resource => ({
								value: resource.id.toString(),
								label: resource.name
							}))}
							onChange={value => {
								if (value) {
									setSelectedResourceId(+value);
									field.onChange(value);
								}
							}}
							error={form.formState.errors.resource?.message as string}
						/>
					)}
				/>
			</Box>
			<Textarea
				label={t('components.resourceStepper.resource.justification.label')}
				description={t('components.resourceStepper.resource.justification.description')}
				withAsterisk
				autosize
				minRows={10}
				{...form.register('justification')}
				error={form.formState.errors.justification?.message as string}
			/>
			{quantityLabel && quantityDefaultValue && (
				<Controller
					control={form.control}
					name="quantity"
					defaultValue={isNaN(+quantityDefaultValue) ? null : +quantityDefaultValue}
					render={({ field }) => (
						<NumberInput
							name={field.name}
							label={quantityLabel}
							withAsterisk
							min={0}
							value={field.value}
							onChange={value => {
								field.onChange(+value);
							}}
							error={form.formState.errors.quantity?.message as string}
						/>
					)}
				/>
			)}
			<Button type="submit" loading={isPending}>
				Request resource allocation
			</Button>
		</Stack>
	);
};

export default ResourceStep;
