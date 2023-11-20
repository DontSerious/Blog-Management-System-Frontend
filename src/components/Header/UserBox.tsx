import { FC } from 'react';
import { Button, Flex, Typography } from 'antd'
import { useUserInfoStore, resetUserInfo } from '../../contexts/UserInfoStore';

const UserBox: FC = () => {
    const { Text } = Typography;
    const { username } = useUserInfoStore()

    return (
        <Flex style={{ position: 'absolute', right: 20, alignItems: 'center'}}>
            <Text style={{ color: 'white', fontSize: '16px' }}>Hi,{ username }</Text>
            &nbsp;&nbsp;&nbsp;
            <Button type="text" onClick={ resetUserInfo } href='/login' danger>
                登出
            </Button>
        </Flex>
    )
}

export default UserBox