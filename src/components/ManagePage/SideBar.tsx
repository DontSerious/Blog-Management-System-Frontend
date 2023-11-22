import React, { useEffect } from 'react';
import { MailOutlined, CalendarOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { setSelectedMenuItem, setShowInfo, useManagePage } from '../../contexts/ManagePageStore';
import { useUserInfoStore } from '../../contexts/UserInfoStore';

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
    const { selectedMenuItem } = useManagePage()
    const { info } = useUserInfoStore();

    useEffect(() => {
        const showInfo = selectedMenuItem === "Categories" ? info!.categories : info!.tags
        setShowInfo(showInfo!);
    }, [selectedMenuItem, info])

    const handleMenuClick = (menuItem: any) => {
        setSelectedMenuItem(menuItem.key);
    };

    return (
        <Menu
            defaultSelectedKeys={[selectedMenuItem]}
            mode="vertical"
            theme="light"
            items={items}
            onClick={handleMenuClick}
        />
    );
};

export default SideBar;
