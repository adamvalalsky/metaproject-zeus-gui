export type User = {
	readonly id: number;
	readonly source: string;
	readonly externalId: string;
	readonly username: string;
};

export type UserInfo = {
	id: number;
	name: string;
	email: string;
	username: string;
};
