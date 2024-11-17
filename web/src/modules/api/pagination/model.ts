export type Pagination = {
	page: number;
	limit: number;
};

export type PaginationMetadata = {
	totalRecords: number;
	page: number;
	recordsPerPage: number;
};

export type PaginationResponse<T> = {
	metadata: PaginationMetadata;
	data: T[];
};
