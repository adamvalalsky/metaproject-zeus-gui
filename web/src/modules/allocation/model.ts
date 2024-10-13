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

export type ResourceDetailAttribute = {
	key: string;
	isPublic: boolean;
	value: string;
	type: string;
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
	attributes: ResourceDetailAttribute[];
};

export type ResourceAttribute = {
	id: number;
	name: string;
	isPublic: boolean;
	isRequired: boolean;
	attributeType: {
		id: number;
		name: string;
	};
	hasResources: boolean;
};

export type Allocation = {
	id: number;
	status: string;
	endDate: Date | null;
	resource: {
		name: string;
		type: string;
	};
};
