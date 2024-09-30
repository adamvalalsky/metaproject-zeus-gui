import z from 'zod';

export const addResourceSchema = z.object({
	name: z.string().min(3).max(100),
	description: z.string().min(15).max(10000),
	isAvailable: z.boolean(),
	resourceTypeId: z.number(),
	parentResourceId: z.number().optional(),
	attributes: z.record(z.string())
});

export type AddResourceSchema = z.infer<typeof addResourceSchema>;
