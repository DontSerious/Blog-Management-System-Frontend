import { FC } from 'react';
import { Select } from 'antd'

const SearchBox: FC = () => {
    return (
        <>
            <Select
                showSearch
                style={{ paddingLeft: 10, width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                    {
                        value: '1',
                        label: 'Not Identified',
                    },
                ]}
            />
        </>
    )
}

export default SearchBox