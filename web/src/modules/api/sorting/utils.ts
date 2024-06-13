export const getSortQuery = (columnAccessor: string, sortDirection: string) =>
	sortDirection === 'asc' ? columnAccessor : `-${columnAccessor}`;
