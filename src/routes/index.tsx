import { Navigate } from "react-router-dom";
import Login from '../pages/login'
import Home from '../pages/home'

export default [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        // 重定向
        path: '/',
        element: <Navigate to = '/home' />
    }
] as {
    path: string,
    element: JSX.Element
}[]