import React from "react";
import './App.css';
import TestPage from "./pages/TestPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage/>
        },
        {
            path: "/test",
            element: <TestPage/>
        }
    ])
    return (
        <React.StrictMode>
            <div className="App">
                <RouterProvider router={router} />
            </div>
        </React.StrictMode>
    )
}

export default App;