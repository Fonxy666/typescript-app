import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Recipes } from './pages/Recipes'
import { Settings } from './pages/Settings'
import TestPage from './pages/TestPage'
import React from 'react'
import Layout from './components/Layout'
import { SignupPage } from './pages/SignupPage'

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                { path: "/", element: <HomePage /> },
                { path: "/recipes", element: <Recipes /> },
                { path: "/settings", element: <Settings /> },
                { path: "/test", element: <TestPage /> },
                { path: "signup", element : <SignupPage /> }
            ]
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

export default App
