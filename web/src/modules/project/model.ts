import { type User, type UserInfo } from '@/modules/user/model';

export type Project = {
	id: number;
	title: string;
	description: string;
	status: string;
	createdAt: string;
	user: User;
};

export type FileDetail = {
	id: number;
	name: string;
	mime: string;
	size: number;
	createdAt: string;
};

export type ArchivalInfo = {
	description: string;
	archivedAt: string;
	file?: FileDetail;
};

export type RejectedComment = {
	comment: string;
	author: string;
	createdAt: string;
};

export type ProjectMember = {
	id: number;
	userInfo: UserInfo;
	role: string;
	status: string;
};
