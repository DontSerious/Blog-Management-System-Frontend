import { Breadcrumb } from 'antd'

const TreePath = () => {
    return (
        <Breadcrumb 
            style={{ margin: '16px 0' }} 
            items={[
                {title: '第一层'},
                {title: '第二层'}
            ]} 
        />
    )
}

export default TreePath