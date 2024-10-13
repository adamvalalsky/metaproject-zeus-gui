import { useMutation } from '@tanstack/react-query';

import { createAttribute } from '@/modules/attribute/api/create-attribute';
import { deleteAttribute } from '@/modules/attribute/api/delete-attribute';

export const useCreateAttributeTypeMutation = () =>
	useMutation({
		mutationFn: createAttribute
	});

export const useDeleteAttributeTypeMutation = () =>
	useMutation({
		mutationFn: deleteAttribute
	});
