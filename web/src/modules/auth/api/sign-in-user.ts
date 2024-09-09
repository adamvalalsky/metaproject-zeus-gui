import { request } from '@/modules/api/request';
import { type ApiResponse, Method } from '@/modules/api/model';
import { type UserInfo } from '@/modules/user/model';

export const signInUser = async (token: string) => {
	const response = (await request('/auth/sign-in', {
		method: Method.POST,
		headers: {
			Authorization: `Bearer ${token}`
		}
	})) as ApiResponse<UserInfo>;

	return response.data?.id;
};
