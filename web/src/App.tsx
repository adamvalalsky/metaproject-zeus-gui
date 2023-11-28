import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<div>Hello world</div>} />
					<Route path="/contacts" element={<div>Hello contacts</div>} />
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	);
}

export default App;
