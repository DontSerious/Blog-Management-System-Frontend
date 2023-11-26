import { FC } from "react"
import { Select } from "antd"
import { useEditStore } from "../../contexts/EditPageStore"

const SearchBox: FC = () => {
  const { searchBoxData } = useEditStore()

  return (
    <>
      <Select
        showSearch
        style={{ paddingLeft: 10, width: 200 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={searchBoxData}
      />
    </>
  )
}

export default SearchBox
