import { CSSProperties, FC } from "react"
import { Checkbox } from "antd"
import type { CheckboxValueType } from "antd/es/checkbox/Group"

interface CKProps {
  style?: CSSProperties
  label: string
  options: string[]
}

const onChange = (checkedValues: CheckboxValueType[]) => {
  console.log("checked = ", checkedValues)
}

const InfoCheckBox: FC<CKProps> = ({ style, label, options }) => {
  return <Checkbox.Group options={options} onChange={onChange} />
}

export default InfoCheckBox
