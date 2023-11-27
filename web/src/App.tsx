import React from 'react';
import './App.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <div>Hello world</div>
        },
        {
            path: 'contacts',
            element: <div>Hello contacts</div>
        }
    ]);

    return (
        <React.StrictMode>
            <RouterProvider router={router}></RouterProvider>
        </React.StrictMode>
    )
}

export default App
