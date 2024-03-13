export type HeadCellSettings<T> = {
	disablePadding: boolean;
	id: keyof T;
	label: string;
	numeric: boolean;
};
