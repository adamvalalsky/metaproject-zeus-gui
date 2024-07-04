import { rem } from '@mantine/core';
import { MIME_TYPES } from '@mantine/dropzone';
import { IconFileTypeDoc, IconFileTypeDocx, IconFileTypePdf } from '@tabler/icons-react';
import React from 'react';

export const getIcon = (type: string, size: number) => {
	const style = { width: rem(size), height: rem(size) };

	if (type === MIME_TYPES.doc) {
		return <IconFileTypeDoc style={style} stroke={1.5} color="var(--mantine-color-cyan-6)" />;
	}

	if (type === MIME_TYPES.docx) {
		return <IconFileTypeDocx style={style} stroke={1.5} color="var(--mantine-color-blue-6)" />;
	}

	return <IconFileTypePdf style={style} stroke={1.5} color="var(--mantine-color-red-8)" />;
};
