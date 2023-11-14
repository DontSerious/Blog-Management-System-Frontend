// contexts/UserInfoContext.tsx
import { createContext, ReactNode, useContext, useState } from 'react';

interface UserInfo {
    userid: string | null;
    username: string | null;
    userinfo: {
        categories: string[];
        tags: string[];
        ipAddress: string | null;
    } | null;
}

interface UserInfoContextProps {
    userInfo: UserInfo;
    setUserInfo: (newUserInfo: UserInfo) => void;
    logout: () => void;
}

const UserInfoContext = createContext<UserInfoContextProps | undefined>(undefined);

export const UserInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        userid: null,
        username: null,
        userinfo: null,
    });

    const logout = () => {
        setUserInfo({
            userid: null,
            username: null,
            userinfo: null,
        });
    };

    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo, logout }}>
            {children}
        </UserInfoContext.Provider>
    );
};

export const useUserInfo = () => {
    const context = useContext(UserInfoContext);
    if (!context) {
        throw new Error('useUserInfo must be used within a UserInfoProvider');
    }
    return context;
};
