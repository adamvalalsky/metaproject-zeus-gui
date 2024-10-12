import { useMutation } from '@tanstack/react-query';

import { createResource } from '@/modules/allocation/api/create-resource';
import { editResource } from '@/modules/allocation/api/edit-resource';
import { requestAllocation } from '@/modules/allocation/api/request-allocation';

export const useCreateResourceMutation = () =>
	useMutation({
		mutationFn: createResource
	});

export const useEditResourceMutation = () =>
	useMutation({
		mutationFn: editResource
	});

export const useRequestAllocationMutation = () =>
	useMutation({
		mutationFn: requestAllocation
	});
