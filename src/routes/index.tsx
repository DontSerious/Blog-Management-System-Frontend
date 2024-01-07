import { createBrowserRouter } from "react-router-dom"
import Login from "../components/AuthPage/Login"
import Register from "../components/AuthPage/Register"
import Edit from "../components/EditPage/Index"
import ManagePage from "../components/ManagePage/Index"
import "../style/index.css"
import File from "../components/FilePage/Index"
import User from "../components/UserPage/Index"
import Home from "../pages/home"
import Auth from "../pages/auth"
import { RequireAuth } from "../utils/auth"
import NotFound from "../pages/notfound"
import App from "../App"
import Admin from "../components/UserPage/AdminBox"
import UserBox from "../components/UserPage/UserBox"

const AuthRoutes = {
  path: "auth",
  element: <Auth />,
  children: [
    {
      path: "login",
      index: true,
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ],
}

const UserRoute = {
  element: (
    <RequireAuth>
      <Home />
    </RequireAuth>
  ),
  children: [
    {
      path: "user",
      element: <User />,
      children: [
        {
          path: "userBox",
          element: <UserBox />,
        },
        {
          path: "adminBox",
          element: <Admin />,
        },
      ],
    },
    {
      path: "manage",
      element: <ManagePage />,
    },
    {
      path: "edit",
      element: <Edit />,
    },
    {
      path: "file",
      element: <File />,
    },
    {
      path: "admin",
      element: <Admin />,
    },
  ],
}

const ErrRoutes = {
  path: "/*",
  element: <NotFound />,
}

export const AppRoutes = createBrowserRouter([
  {
    element: <App />,
    children: [AuthRoutes, UserRoute, ErrRoutes],
  },
])
