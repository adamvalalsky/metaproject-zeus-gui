import z from 'zod';

export const searchByDoiSchema = z.object({
	doi: z.string()
});

export type SearchByDoiSchema = z.infer<typeof searchByDoiSchema>;
