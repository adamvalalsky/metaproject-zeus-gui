export type ResourceType = {
	id: number;
	name: string;
	description: string;
	hasResources: boolean;
};

export type Resource = {
	id: number;
	name: string;
	isAvailable: true;
	parentResourceId: number | null;
	resourceType: {
		id: number;
		name: string;
	};
};

export type ResourceDetail = {
	id: number;
	name: string;
	description: string;
	isAvailable: true;
	parentResource: {
		id: number;
		name: string;
	};
	resourceType: {
		id: number;
		name: string;
	};
	attributes: {
		key: string;
		value: string;
	}[];
};
