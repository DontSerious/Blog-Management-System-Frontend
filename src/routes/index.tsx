import { Navigate } from "react-router-dom"
import Login from "../pages/login"
import Register from "../pages/register"
import Edit from "../pages/edit"
import ManagePage from "../pages/manage"
import "../style/index.css"

export default [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/edit",
    element: <Edit />,
  },
  {
    path: "/manage",
    element: <ManagePage />,
  },
  {
    // 重定向
    path: "/",
    element: <Navigate to="/login" />,
  },
] as {
  path: string
  element: JSX.Element
}[]
