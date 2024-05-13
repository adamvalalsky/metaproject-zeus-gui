import z from 'zod';

export const requestProjectSchema = z.object({
	title: z.string().min(3).max(100),
	description: z.string().min(15).max(1000)
});

export type RequestProjectSchema = z.infer<typeof requestProjectSchema>;
