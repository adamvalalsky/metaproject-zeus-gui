import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@mantine/core/styles.css';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import Loading from '@/components/global/loading';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Suspense fallback={<Loading />}>
			<App />
		</Suspense>
	</React.StrictMode>
);
