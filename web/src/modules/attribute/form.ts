import z from 'zod';

export const addAttributeSchema = z.object({
	name: z.string().min(3).max(100),
	isPublic: z.boolean(),
	isRequired: z.boolean(),
	attributeTypeId: z.number()
});

export type AddAttributeSchema = z.infer<typeof addAttributeSchema>;
