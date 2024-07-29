export type Publication = {
	id?: number;
	title: string;
	authors: string;
	journal: string;
	year: number;
	uniqueId?: string;
	source?: 'doi' | 'manual';
};
