import { ActionIcon, Anchor, Box, Group, Select, Stack, Text, Title, Tooltip } from '@mantine/core';
import { IconEyeCheck, IconEyeClosed, IconPlus, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AttributeInput from '@/components/resource/attributes/attribute-input';
import { type ResourceAttribute } from '@/modules/allocation/model';
import { type Attribute } from '@/modules/attribute/model';

type AttributesProps = {
	attributes: ResourceAttribute[];
	setAttributes: (attributes: Attribute[]) => void;
};

const CustomAttributes = ({ attributes, setAttributes }: AttributesProps) => {
	const { t } = useTranslation();
	const [optionalAttributes, setOptionalAttributes] = useState<Attribute[]>([]);

	if (!attributes) {
		return null;
	}

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
				{attributes
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
								data={attributes
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
