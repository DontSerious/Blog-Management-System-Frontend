import { Navigate } from "react-router-dom"
import { useUserInfoStore } from "../contexts/UserInfoStore"

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuth } = useUserInfoStore()

  if (!isAuth) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}
