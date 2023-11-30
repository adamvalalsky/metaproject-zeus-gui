import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import Root from './routes/Root';
import ErrorPage from "./components/ErrorPage";

function App() {
	const theme = createTheme();

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				path="/"
				element={<Root />}
				errorElement={<ErrorPage />}
			/>
		)
	);

	return (
		<ThemeProvider theme={theme}>
			<RouterProvider router={router}></RouterProvider>
		</ThemeProvider>
	);
}

export default App;
