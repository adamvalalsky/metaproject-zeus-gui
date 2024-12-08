import z from 'zod';

export const addResourceSchema = z.object({
	name: z.string().min(3).max(100),
	description: z.string().min(15).max(10000),
	isAvailable: z.boolean(),
	resourceTypeId: z.number(),
	parentResourceId: z.number().optional(),
	attributes: z
		.object({
			key: z.string().min(2).max(100),
			value: z.string().max(100)
		})
		.array()
		.optional()
});

export type AddResourceSchema = z.infer<typeof addResourceSchema>;
export type EditResourceSchema = { id: number } & AddResourceSchema;

export const addAllocationSchema = z.object({
	justification: z.string().min(3),
	resourceId: z.string().refine(value => parseInt(value) > 0),
	quantity: z.number().min(0).optional()
});

export type AddAllocationSchema = z.infer<typeof addAllocationSchema>;

export const approveAllocationSchema = z.object({
	startDate: z.date().optional(),
	endDate: z.date().optional(),
	status: z.string().min(1),
	description: z.string().optional()
});

export type ApproveAllocationSchema = z.infer<typeof approveAllocationSchema>;
