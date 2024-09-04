import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { createTheme, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalsProvider } from '@mantine/modals';

import Project from '@/routes/project';
import AddProject from '@/routes/project/add';
import ProjectDetail from '@/routes/project/detail';
import NotFound from '@/components/global/not-found';
import ProjectDetailMembers from '@/routes/project/detail/members';
import ProjectArchivePage from '@/routes/project/detail/archive';
import ProjectRequests from '@/routes/admin/requests';
import ProjectRequestDetail from '@/routes/admin/requests/detail';
import PrivateRouteGuard from '@/modules/auth/guards/private-route-guard';
import AdminRouteGuard from '@/modules/auth/guards/admin-route-guard';
import ProjectDetailGuard from '@/modules/auth/guards/project-detail-guard';
import ProjectPublicationsAddPage from '@/routes/project/detail/publications';
import ProjectRequestPage from '@/routes/project/detail/request';
import AuthLogin from '@/routes/auth/login';

import Index from './routes/index/index';
import Root from './routes/root';
import { AuthContextProvider } from './modules/auth/context';
import i18next from './modules/language/i18next';
import ErrorPage from './components/global/error-page';

const App = () => {
	const theme = createTheme({
		primaryShade: 7,
		primaryColor: 'sky',
		// autoContrast: true,
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
				<Route path="auth/login" element={<AuthLogin />} />
				<Route path="/project" element={<PrivateRouteGuard />}>
					<Route index element={<Project />} />
					<Route path="add" element={<AddProject />} />
					<Route path=":id" element={<ProjectDetailGuard />}>
						<Route index element={<ProjectDetail />} />
						<Route path="members" element={<ProjectDetailMembers />} />
						<Route path="archive" element={<ProjectArchivePage />} />
						<Route path="publications" element={<ProjectPublicationsAddPage />} />
						<Route path="request" element={<ProjectRequestPage />} />
					</Route>
				</Route>
				<Route path="/admin" element={<AdminRouteGuard />}>
					<Route path="requests" element={<ProjectRequests />} />
					<Route path="requests/:id" element={<ProjectDetailGuard />}>
						<Route index element={<ProjectRequestDetail />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Route>
		)
	);

	const queryClient = new QueryClient();

	return (
		<MantineProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<I18nextProvider i18n={i18next}>
					<AuthContextProvider>
						<ModalsProvider>
							<RouterProvider router={router} />
						</ModalsProvider>
					</AuthContextProvider>
				</I18nextProvider>
			</QueryClientProvider>
		</MantineProvider>
	);
};

export default App;
