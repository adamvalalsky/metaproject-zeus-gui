export const strip = (html: string) => {
	const doc = new DOMParser().parseFromString(html, 'text/html');
	return doc.body.textContent ?? '';
};
