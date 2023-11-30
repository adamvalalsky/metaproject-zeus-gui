import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import Root from './routes/Root';

function App() {
	const theme = createTheme();

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Root />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
