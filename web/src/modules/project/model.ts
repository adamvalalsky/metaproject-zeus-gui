import { type User, type UserInfo } from '@/modules/user/model';
import { type PaginationMetadata } from '@/modules/api/pagination/model';

export type MyProjectResponse = {
	projects: Project[];
};

export type ProjectDetailResponse = {
	project: Project;
	permissions: string[];
};

export type MemberList = {
	metadata: PaginationMetadata;
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
