import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import Root from './routes/Root';
import ErrorPage from './components/ErrorPage';
import fetchUser from './routes/Root/loader.ts';
import Index from './routes/Index/index.tsx';
import { AuthContextProvider } from './modules/auth/context';
import Dashboard from './routes/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import loadProjects from './routes/Dashboard/loader.ts';

function App() {
	const theme = createTheme();

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route id="root" path="/" loader={() => fetchUser()} element={<Root />} errorElement={<ErrorPage />}>
				<Route index element={<Index />} />
				<Route
					path="dashboard"
					loader={() => loadProjects()}
					element={<PrivateRoute component={Dashboard} />}
				/>
			</Route>
		)
	);

	return (
		<ThemeProvider theme={theme}>
			<AuthContextProvider>
				<RouterProvider router={router} />
			</AuthContextProvider>
		</ThemeProvider>
	);
}

export default App;
