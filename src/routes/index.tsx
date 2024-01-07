import { createBrowserRouter } from "react-router-dom"
import Login from "../components/AuthPage/login"
import Register from "../components/AuthPage/register"
import Edit from "../components/EditPage/edit"
import ManagePage from "../components/ManagePage/manage"
import "../style/index.css"
import File from "../components/FilePage/file"
import User from "../components/UserPage/user"
import Home from "../pages/home"
import Auth from "../pages/auth"
import { RequireAuth } from "../utils/auth"
import NotFound from "../pages/notfound"
import App from "../App"
import Admin from "../components/UserPage/adminBox"
import UserBox from "../components/UserPage/userBox"

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
