import { request } from '@/modules/api/request';
import { Method } from '@/modules/api/model';
import { type UserInfo } from '@/modules/user/model';

export const signInUser = async (token: string) =>
	request<UserInfo>('/auth/sign-in', {
		method: Method.POST,
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
