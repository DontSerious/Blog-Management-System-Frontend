import { FC } from "react"
import { Outlet } from "react-router-dom"

const Auth: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Outlet />
    </div>
  )
}

export default Auth
