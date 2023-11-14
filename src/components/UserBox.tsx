import { FC } from 'react';
import { Button, Flex, Typography } from 'antd'
import { useUserInfo } from "../contexts/UserInfoContext";

const UserBox: FC = () => {
    const { Text } = Typography;
    const { userInfo, logout } = useUserInfo();

    return (
        <Flex style={{ position: 'absolute', right: 20, alignItems: 'center'}}>
            <Text style={{ color: 'white', fontSize: '16px' }}>Hi,{ userInfo.username }</Text>
            &nbsp;&nbsp;&nbsp;
            <Button type="text" onClick={logout} href='/login' danger ghost>
                登出
            </Button>
        </Flex>
    )
}

export default UserBox