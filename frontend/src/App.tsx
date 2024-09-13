import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Recipes } from './pages/Recipes'
import { Settings } from './pages/Settings'
import TestPage from './pages/TestPage'
import { Navbar } from './components/Navbar'
import React from 'react'

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage/>
        },
        {
            path: "/recipes",
            element: <Recipes />
        },
        {
            path: "/settings",
            element: <Settings />
        },
        {
            path: "/test",
            element: <TestPage/>
        }
    ])
    return (
        <React.StrictMode>
            <div className="App">
                <Navbar />
                <RouterProvider router={router} />
            </div>
        </React.StrictMode>
    )
}

export default App
