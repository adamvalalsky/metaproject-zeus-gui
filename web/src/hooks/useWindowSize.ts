import { useEffect, useState } from 'react';

const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState(window.innerWidth);

	useEffect(() => {
		const onResize = () => {
			setWindowSize(window.innerWidth);
		};

		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	return windowSize;
};

export default useWindowSize;
