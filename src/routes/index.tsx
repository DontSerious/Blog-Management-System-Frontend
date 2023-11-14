import { Navigate } from "react-router-dom";
import Login from '../pages/login'
import Register from '../pages/register'
import Home from '../pages/home'
import '../style/index.css'

export default [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        // 重定向
        path: '/',
        element: <Navigate to = '/login' />
    }
] as {
    path: string,
    element: JSX.Element
}[]