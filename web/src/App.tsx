import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Index from "./routes/Index";

function App() {
	return (
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Index />} />
					<Route path="/contacts" element={<div>Hello contacts</div>} />
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	);
}

export default App;
