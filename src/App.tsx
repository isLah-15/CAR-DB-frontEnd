import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import LandingPage from './Pages/Landing'
import AboutPage from './Pages/AboutPage'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import ServicesPage from './Pages/ServicesPage'
import Error from './Pages/Error'
import VerifyUser from './Pages/Auth/VerifyPage'
import AdminDashboard from './Dashboard/AdminDashboard/AdminDashboard'
import Users from './Dashboard/AdminDashboard/ManageUsers/Users'
import Profile from './Dashboard/AdminDashboard/Profile'
import UserDashboard from './Dashboard/UserDashboard/UserDashboard'
import UserProfile from './Dashboard/UserDashboard/UserProfile'

import { useSelector } from 'react-redux'
import type { RootState } from './app/store'

function App() {
  const user = useSelector((state: RootState) => state.user.user)

  const router = createBrowserRouter([
    { path: '/', element: <LandingPage /> },
    { path: '/about', element: <AboutPage /> },
    { path: '/register', element: <Register /> },
    { path: '/login', element: <Login /> },
    { path: '/services', element: <ServicesPage /> },
    { path: '/verify', element: <VerifyUser /> },

    // Admin Dashboard Routes
    {
      path: '/admin/dashboard',
      element: user?.role === 'admin' ? <AdminDashboard /> : <Login />,
      children: [
        { path: 'analytics', element: <h1>Analytics</h1> },
        { path: 'users', element: <Users /> },
        { path: 'profile', element: <Profile /> },
      ]
    },

    // User Dashboard Routes
    {
      path: '/user/dashboard',
      element: user?.role === 'customer' ? <UserDashboard /> : <Login />,
      children: [
        { path: 'analytics', element: <h1>Analytics</h1> },
        { path: 'profile', element: <UserProfile /> },
      ]
    },

    { path: '*', element: <Error /> },
  ])

  return <RouterProvider router={router} />
}

export default App
