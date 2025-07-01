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
import Cars from './Dashboard/AdminDashboard/Cars/Cars'
// import UserCars from './Dashboard/UserDashboard/Cars/UserCar'
import { Toaster } from 'sonner'
import UserCars from './Dashboard/UserDashboard/Cars/UserCar'

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
        { path: 'cars', element: <Cars /> }
      ]
    },

    // User Dashboard Routes
    {
      path: '/user/dashboard',
      element: user?.role === 'customer' ? <UserDashboard /> : <Login />,
      children: [
        { path: 'analytics', element: <h1>Analytics</h1> },
        { path: 'profile', element: <UserProfile /> },
        { path: 'cars', element: <UserCars /> }
      ]
    },

    { path: '*', element: <Error /> },
  ])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position='top-right' toastOptions={{
        classNames: {
          error: 'bg-red-500 text-white',
          success: 'bg-green-500 text-white',
          info: 'bg-blue-500 text-white',
        }

      }} />
    </>
  )
}

export default App
