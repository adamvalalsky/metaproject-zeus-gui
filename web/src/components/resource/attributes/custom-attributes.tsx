import { ActionIcon, Anchor, Box, Group, Select, Stack, Text, Title, Tooltip } from '@mantine/core';
import { IconEyeCheck, IconEyeClosed, IconPlus, IconTrash } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AttributeInput from '@/components/resource/attributes/attribute-input';
import { type ResourceAttribute, type ResourceDetailAttribute } from '@/modules/allocation/model';
import { type Attribute } from '@/modules/attribute/model';

type AttributesProps = {
	defaultAttributes?: ResourceDetailAttribute[];
	attributes: ResourceAttribute[];
	setAttributes: (attributes: Attribute[]) => void;
};

const CustomAttributes = ({ attributes, setAttributes, defaultAttributes }: AttributesProps) => {
	const { t } = useTranslation();
	const [requiredAttributes, setRequiredAttributes] = useState<Attribute[]>([]);
	const [optionalAttributes, setOptionalAttributes] = useState<Attribute[]>([]);

	useEffect(() => {
		if (!defaultAttributes) {
			return;
		}

		const customAttributes = defaultAttributes.filter(a => !a.key.startsWith('quantity_'));
		if (customAttributes) {
			let optionalAttributeIndex = 0;
			let requiredAttributeIndex = 0;

			for (const attribute of customAttributes) {
				if (attribute.isRequired) {
					addRequiredAttribute(attribute.key, attribute.value, requiredAttributeIndex);
					requiredAttributeIndex++;
				} else {
					addOptionalAttribute(attribute.key, attribute.value, optionalAttributeIndex);
					optionalAttributeIndex++;
				}
			}
		}
	}, [!!defaultAttributes]);

	if (!attributes && !optionalAttributes && !requiredAttributes) {
		return null;
	}

	const addRequiredAttribute = (key: string, value: string, index: number) => {
		const resourceAttribute = attributes.find(a => a.name === key);
		if (index >= requiredAttributes.length) {
			setRequiredAttributes([
				...requiredAttributes,
				{ key, value, index, isPublic: resourceAttribute?.isPublic }
			]);
		} else {
			const type = resourceAttribute?.attributeType.name;
			const newAttributes = requiredAttributes.map(attribute =>
				attribute.index === index
					? { key, value, index, type, isPublic: resourceAttribute?.isPublic }
					: attribute
			);
			setRequiredAttributes(newAttributes);
			setAttributes(newAttributes.map(a => ({ key: a.key, value: a.value })));
		}
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
			setAttributes(newAttributes.map(a => ({ key: a.key, value: a.value })));
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
		setAttributes(newAttributes.map(a => ({ key: a.key, value: a.value })));
	};

	return (
		<Box my={20}>
			<Title order={4}>{t('routes.ResourceAddPage.form.custom_attributes.title')}</Title>
			<Text c="dimmed">{t('routes.ResourceAddPage.form.custom_attributes.description')}</Text>
			<Group>
				{requiredAttributes.map(attribute => (
					<Group key={attribute.index}>
						{attribute.key && attribute.type && (
							<AttributeInput
								value={attribute.value}
								label={attribute.key}
								type={attribute.type}
								onChange={value => {
									if (value && attribute.index !== undefined) {
										addRequiredAttribute(value, '', attribute.index);
									}
								}}
							/>
						)}
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
											addOptionalAttribute(attribute.key, value, attribute.index);
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
