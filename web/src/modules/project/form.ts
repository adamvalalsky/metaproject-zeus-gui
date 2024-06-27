import z from 'zod';

export const requestProjectSchema = z.object({
	title: z.string().min(3).max(100),
	description: z.string().min(15).max(1000)
});

export type RequestProjectSchema = z.infer<typeof requestProjectSchema>;

export const addMembersSchema = z.object({
	projectId: z.number(),
	members: z.array(
		z.object({
			id: z.number(),
			role: z.string().min(3).max(100)
		})
	)
});

export type AddMembersSchema = z.infer<typeof addMembersSchema>;

export const archiveProjectSchema = z.object({
	justification: z.string().min(5),
	file: z.string().optional()
});

export type ArchiveProjectSchema = z.infer<typeof archiveProjectSchema>;
