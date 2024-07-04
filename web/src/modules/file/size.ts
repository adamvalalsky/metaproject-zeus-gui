const BYTE = 1000;

export const sizeToText = (size: number) => {
	const units = ['B', 'KB', 'MB', 'GB', 'TB'];

	let coefficient = BYTE;
	for (const unit of units) {
		if (size < coefficient) {
			const calculatedSize = size / (coefficient / BYTE);
			return `${calculatedSize.toFixed(2)} ${unit}`;
		}
		coefficient *= BYTE;
	}
};
