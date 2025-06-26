import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
// import Error from './components/error/Error'

import LandingPage from './Pages/Landing'
import AboutPage from './Pages/AboutPage'
import Dashboard from './Pages/Dashboard'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import ServicesPage from './Pages/ServicesPage'
import Error from './Pages/Error'
import VerifyUser from './Pages/Auth/VerifyPage'



function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/login',
      element: <Login />
    },
     {
      path: '/services',
      element: <ServicesPage/>
    },
    {
      path: '/verify',
      element: <VerifyUser />
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        {
          path: 'main',
          element: <h1>Analytics</h1>
        },
        
        // {
        //   path: 'profile',
        //   element: <h1>Analytics</h1>
        // }
      ]
    },
    {
      path: '*',
      element: <Error />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App