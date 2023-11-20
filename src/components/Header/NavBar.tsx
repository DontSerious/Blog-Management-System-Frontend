import { FC } from 'react';
import type { MenuProps } from 'antd'
import { Menu } from 'antd'

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const NavBar: FC = () => {
    return (
        <>
            <Menu
                style={{ paddingLeft: 10 }}
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']} 
                items={items1} 
            />
        </>
    )
}

export default NavBar