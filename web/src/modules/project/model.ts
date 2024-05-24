import { type User, type UserInfo } from '@/modules/user/model';

export type MyProjectResponse = {
	projects: Project[];
};

export type MemberList = {
	members: ProjectMember[];
};

export type Project = {
	id: number;
	title: string;
	description: string;
	status: string;
	user: User;
};

export type ProjectMember = {
	id: number;
	userInfo: UserInfo;
	role: string;
	status: string;
};
