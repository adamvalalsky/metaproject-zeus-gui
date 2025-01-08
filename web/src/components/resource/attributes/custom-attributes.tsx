import { ActionIcon, Anchor, Box, Fieldset, Group, Select, Stack, Text, Title, Tooltip } from '@mantine/core';
import { IconEyeCheck, IconEyeClosed, IconPlus, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AttributeInput from '@/components/resource/attributes/attribute-input';
import { type Attribute } from '@/modules/attribute/model';
import { type ResourceAttribute, type ResourceDetailAttribute } from '@/modules/resource/model';

type AttributesProps = {
	defaultAttributes: ResourceDetailAttribute[];
	attributes: ResourceAttribute[];
	setAttributes: (attributes: Attribute[]) => void;
};

const CustomAttributes = ({ attributes, setAttributes, defaultAttributes }: AttributesProps) => {
	const { t } = useTranslation();
	const [requiredAttributes, setRequiredAttributes] = useState<Attribute[]>(
		defaultAttributes
			.filter(a => a.isRequired)
			.map(a => ({
				key: a.key,
				value: a.value,
				type: a.type,
				isPublic: a.isPublic
			}))
	);
	const [optionalAttributes, setOptionalAttributes] = useState<Attribute[]>(
		defaultAttributes
			.filter(a => !a.isRequired)
			.map(a => ({
				key: a.key,
				value: a.value,
				type: a.type,
				isPublic: a.isPublic
			}))
	);

	if (!attributes && !optionalAttributes && !requiredAttributes) {
		return null;
	}

	const setAllAttributes = () => {
		setAttributes([
			...requiredAttributes.map(a => ({ key: a.key, value: a.value })),
			...optionalAttributes.map(a => ({ key: a.key, value: a.value }))
		]);
	};

	const addRequiredAttribute = (key: string, value: string) => {
		setRequiredAttributes(attributes =>
			attributes.map(a => {
				if (a.key === key) {
					return { ...a, value };
				}

				return a;
			})
		);
		setAllAttributes();
	};

	const addOptionalAttribute = (key: string, value: string, index: number) => {
		const resourceAttribute = attributes.find(a => a.name === key);
		if (index >= optionalAttributes.length) {
			setOptionalAttributes([
				...optionalAttributes,
				{ key, value, index, isPublic: resourceAttribute?.isPublic }
			]);
		} else {
			const type = resourceAttribute?.attributeType.name;
			const newAttributes = optionalAttributes.map(attribute =>
				attribute.index === index
					? { key, value, index, type, isPublic: resourceAttribute?.isPublic }
					: attribute
			);
			setOptionalAttributes(newAttributes);
			setAllAttributes();
		}
	};

	const removeOptionalAttribute = (index?: number) => {
		if (index === undefined) {
			return;
		}

		const newAttributes = optionalAttributes
			.filter(attribute => attribute.index !== index)
			.map((attribute, i) => ({ ...attribute, index: i }));
		setOptionalAttributes(newAttributes);
		setAllAttributes();
	};

	return (
		<Box my={20}>
			<Title order={4}>{t('routes.ResourceAddPage.form.custom_attributes.title')}</Title>
			<Text c="dimmed">{t('routes.ResourceAddPage.form.custom_attributes.description')}</Text>
			<Fieldset legend="Required attributes" my={10}>
				{requiredAttributes.map(attribute => (
					<Group my={5} key={attribute.key}>
						{attribute.key && attribute.type && (
							<AttributeInput
								value={attribute.value}
								label={attribute.key}
								type={attribute.type}
								onChange={value => {
									if (value) {
										addRequiredAttribute(attribute.key, value);
									}
								}}
							/>
						)}
					</Group>
				))}
			</Fieldset>
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
								data={attributes
									.filter(a => !a.isRequired)
									.filter(a => {
										if (a.name.startsWith('quantity_')) {
											return false;
										}

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
									value={attribute.value}
									label=""
									type={attribute.type}
									onChange={value => {
										if (attribute.index !== undefined) {
											addOptionalAttribute(attribute.key, value ?? '', attribute.index);
										}
									}}
								/>
							)}
							{attribute.isPublic && (
								<Tooltip label="Attribute is public and will be visible to user">
									<IconEyeCheck />
								</Tooltip>
							)}
							{attribute.isPublic === false && (
								<Tooltip label="Attribute is private and will be visible only to admin">
									<IconEyeClosed style={{ opacity: 0.5 }} />
								</Tooltip>
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
		</Box>
	);
};

export default CustomAttributes;
