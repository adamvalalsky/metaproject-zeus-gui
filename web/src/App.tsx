import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { createTheme, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Project from '@/routes/project';
import AddProject from '@/routes/project/add';
import ProjectDetail from '@/routes/project/detail';

import Index from './routes/index/index';
import Root from './routes/root';
import { AuthContextProvider } from './modules/auth/context';
import i18next from './modules/language/i18next';
import PrivateRoute from './components/global/private-route';
import ErrorPage from './components/global/error-page';

const App = () => {
	const theme = createTheme({
		primaryShade: 7,
		primaryColor: 'sky',
		autoContrast: true,
		cursorType: 'pointer',
		colors: {
			sky: [
				'#ebf6ff',
				'#d5e9fa',
				'#a5d1f7',
				'#73b9f6',
				'#50a4f5',
				'#3d97f5',
				'#3491f6',
				'#297ddb',
				'#1d6fc4',
				'#0060ad'
			]
		}
	});

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route id="root" path="/" element={<Root />} errorElement={<ErrorPage />}>
				<Route index element={<Index />} />
				<Route path="/project" element={<PrivateRoute />}>
					<Route index element={<Project />} />
					<Route path="add" element={<AddProject />} />
					<Route path=":id" element={<ProjectDetail />} />
				</Route>
			</Route>
		)
	);

	const queryClient = new QueryClient();

	return (
		<MantineProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<I18nextProvider i18n={i18next}>
					<AuthContextProvider>
						<RouterProvider router={router} />
					</AuthContextProvider>
				</I18nextProvider>
			</QueryClientProvider>
		</MantineProvider>
	);
};

export default App;
