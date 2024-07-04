export const sanitize = (input: string) => {
	const doc = new DOMParser().parseFromString(input, 'text/html');
	for (const elm of doc.querySelectorAll('*')) {
		for (const attrib of elm.attributes) {
			if (attrib.name.startsWith('on')) {
				elm.removeAttribute(attrib.name);
			}
		}
	}
	return doc.body.innerHTML;
};
