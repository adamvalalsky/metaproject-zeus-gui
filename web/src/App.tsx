import React from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<div>Hello world</div>}></Route>
                    <Route path='/contacts' element={<div>Hello contacts</div>}></Route>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    )
}

export default App
