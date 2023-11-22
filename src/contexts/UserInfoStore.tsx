import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface UserInfo {
    userId: string | null;
    username: string | null;
    info: {
        categories: string[];
        tags: string[];
    } | null;
}

export const useUserInfoStore = create<UserInfo>()(
    persist(
        (set) => ({
            userId: null,
            username: null,
            info: null,
            set,
        }),
        {
            name: 'userInfo',
            getStorage: () => localStorage,
        }
    )
)

export const setUserInfo = (userId: string, username: string, info: UserInfo['info']) =>
    useUserInfoStore.setState({
        userId: userId,
        username: username,
        info: info
    })

export const resetUserInfo = () =>
    useUserInfoStore.setState({
        userId: null,
        username: null,
        info: null,
    })
