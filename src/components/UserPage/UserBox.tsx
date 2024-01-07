import { FC } from "react"
import { useUserInfoStore } from "../../contexts/UserInfoStore"

const UserBox: FC = () => {
  const { userId, username, info } = useUserInfoStore()

  return (
    <div>
      <h2>User Profile</h2>
      <p>userId: {userId}</p>
      <p>username: {username}</p>
      <p>categories: {info.categories.toLocaleString()}</p>
      <p>tags: {info.tags.toLocaleString()}</p>
    </div>
  )
}

export default UserBox
