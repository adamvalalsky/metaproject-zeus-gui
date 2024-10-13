import { request } from '@/modules/api/request';
import { Method } from '@/modules/api/model';
import { type UserInfo } from '@/modules/user/model';

export const signInUser = async (token: string, externalId: string) => {
	const response = await request<UserInfo>('/auth/sign-in', {
		method: Method.POST,
		headers: {
			Authorization: `Bearer ${token}`
		},
		json: {
			externalId
		}
	});

	return response.id;
};
