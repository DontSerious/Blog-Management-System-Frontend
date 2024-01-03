import { Table, Tag, message } from "antd"
import { ColumnsType } from "antd/es/table"
import { FC, useEffect, useState } from "react"
import { delUser, getAllUser } from "../../services/userAPI"
import { StatusSuccess } from "../../utils/constants"

interface DataType {
  key: string
  user_id: string
  username: string
  user_info: {
    categories: string[]
    tags: string[]
  }
}

interface ApiResponse {
  data: DataType[]
  status_code: number
  status_msg: string
}

const fetchData = async (): Promise<DataType[]> => {
  try {
    const response = await getAllUser()
    const data: ApiResponse = response.data

    if (data.status_code === 0) {
      return data.data
    } else {
      throw new Error(data.status_msg)
    }
  } catch (error) {
    message.error("Error fetching user info:" + error)
    throw error
  }
}

const Admin: FC = () => {
  const [data, setData] = useState<DataType[]>([])

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "_id",
      dataIndex: "user_id",
      key: "key",
    },
    {
      title: "Categories",
      key: "categories",
      dataIndex: "categories",
      render: (_, { user_info }) => (
        <>
          {user_info.categories.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green"
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { user_info }) => (
        <>
          {user_info.tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green"
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (info) => (
        <a
          onClick={async () => {
            const resp = await delUser(info.key)
            const data = resp.data
            if (data.status_code === StatusSuccess) {
              message.success("删除成功")
              init()
            } else {
              message.error("删除失败：" + data.status_msg)
            }
          }}
        >
          Delete
        </a>
      ),
    },
  ]

  // 使用 async 函数来获取数据
  const init = async () => {
    try {
      const userInfoList = await fetchData()

      userInfoList.forEach((element) => {
        element.key = element.user_id
      })

      setData(userInfoList)
    } catch (error) {
      console.error("Error fetching user info:", error)
    }
  }

  useEffect(() => {
    init()
  }, [])

  return <Table columns={columns} dataSource={data} />
}

export default Admin
