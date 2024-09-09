import { request } from '@/modules/api/request';
import { type ApiResponse, Method } from '@/modules/api/model';
import { type UserInfo } from '@/modules/user/model';

export const signInUser = async (token: string, externalId: string) => {
	const response = (await request('/auth/sign-in', {
		method: Method.POST,
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			externalId
		})
	})) as ApiResponse<UserInfo>;

	return response.data?.id;
};
