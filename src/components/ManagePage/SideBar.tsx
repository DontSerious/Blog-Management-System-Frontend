import React from 'react';
import { MailOutlined, CalendarOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
// import { useUserInfo } from '../../contexts/UserInfoContext';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
): MenuItem {
    return {
        key,
        icon,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem("Categories", "Categories", <MailOutlined />),
    getItem("Tags", "Tags", <CalendarOutlined />),
];

const SideBar: React.FC = () => {
    // const { setSelectedMenuItem } = useUserInfo();

    const handleMenuClick = (menuItem: any) => {
        // setSelectedMenuItem(menuItem.key);
    };

    return (
        <Menu
            defaultSelectedKeys={["Categories"]}
            mode="vertical"
            theme="light"
            items={items}
            onClick={handleMenuClick}
        />
    );
};

export default SideBar;
