import { Button, Flex, TextInput } from '@mantine/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IconSend } from '@tabler/icons-react';

import TextEditor from '@/components/global/text-editor';
import { type RequestProjectSchema } from '@/modules/project/form';

type RequestFormProps = {
	onSubmit: (values: RequestProjectSchema) => void;
	loading: boolean;
	submitText: string;
};

const RequestForm = ({ loading, onSubmit, submitText }: RequestFormProps) => {
	const { t } = useTranslation();
	const form = useFormContext<RequestProjectSchema>();

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<TextInput
				label="Title"
				withAsterisk
				placeholder="Project title"
				error={form.formState.errors.title?.message as string}
				{...form.register('title')}
			/>
			<TextEditor label="Description" inputHtmlName="description" />
			<Flex justify="center">
				<Button
					loading={loading}
					leftSection={<IconSend />}
					type="submit"
					variant="filled"
					color="teal"
					mt={10}
					w={200}
				>
					{submitText}
				</Button>
			</Flex>
		</form>
	);
};

export default RequestForm;
