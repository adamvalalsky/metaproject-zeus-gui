import { useMutation } from '@tanstack/react-query';

import { addPublications } from '@/modules/publication/api/add-publications';
import { removePublication } from '@/modules/publication/api/remove-publication';

export const useAddPublicationsMutation = () =>
	useMutation({
		mutationFn: addPublications
	});

export const useRemovePublicationMutation = () =>
	useMutation({
		mutationFn: removePublication
	});
