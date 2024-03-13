import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import Root from './routes/Root';
import ErrorPage from './components/ErrorPage';
import fetchUser from './routes/Root/loader.ts';
import Index from './routes/Index/index.tsx';
import { AuthContextProvider } from './modules/auth/context';
import Dashboard from './routes/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import loadProjects from './routes/Dashboard/loader.ts';
import AddProject from './routes/AddProject';
import { addProjectAction } from './routes/AddProject/action.ts';
import ProjectDetail from './routes/ProjectDetail';
import i18next from './modules/language/i18next.ts';

function App() {
	const theme = createTheme({
		palette: {
			primary: {
				main: '#00569c',
				dark: '#002D52'
			},
			secondary: {
				main: '#EE6352',
				dark: '#CC2A14'
			},
			success: {
				main: '#57A773'
			}
		}
	});

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route id="root" path="/" loader={() => fetchUser()} element={<Root />} errorElement={<ErrorPage />}>
				<Route index element={<Index />} />
				<Route path="project" loader={() => loadProjects()} element={<PrivateRoute component={Dashboard} />} />
				<Route path="project/add" action={addProjectAction} element={<PrivateRoute component={AddProject} />} />
				<Route path="project/:id" element={<PrivateRoute component={ProjectDetail} />} />
			</Route>
		)
	);

	return (
		<ThemeProvider theme={theme}>
			<I18nextProvider i18n={i18next}>
				<AuthContextProvider>
					<RouterProvider router={router} />
				</AuthContextProvider>
			</I18nextProvider>
		</ThemeProvider>
	);
}

export default App;
