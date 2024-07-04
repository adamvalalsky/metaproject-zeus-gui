export const sizeToText = (size: number) => {
	const units = ['B', 'KB', 'MB', 'GB', 'TB'];

	let coefficient = 1000;
	for (const unit of units) {
		if (size < coefficient) {
			const calculatedSize = size / (coefficient / 1000);
			return `${calculatedSize.toFixed(2)} ${unit}`;
		}
		coefficient *= 1000;
	}
};
