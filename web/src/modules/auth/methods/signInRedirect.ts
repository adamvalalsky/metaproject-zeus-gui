export const signInRedirect = async () => {
	window.location.href = `${import.meta.env.VITE_API_URL}/auth/login`;
};
