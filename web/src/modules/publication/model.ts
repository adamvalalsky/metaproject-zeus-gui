export type Publication = {
	title: string;
	authors: string;
	journal: string;
	year: number;
	uniqueId?: string;
	source?: 'doi' | 'manual';
};
