import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

interface UserInfo {
    userid: string | null;
    username: string | null;
    info: {
        categories: string[];
        tags: string[];
    } | null;
}

export const useUserInfoStore = create<UserInfo>()(
    devtools(
        persist(
            (set) => ({
                userid: null,
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
)

export const setUserInfo = (userid: string, username: string, info: UserInfo['info']) =>
    useUserInfoStore.setState({
        userid: userid,
        username: username,
        info: info
    })

export const resetUserInfo = () =>
    useUserInfoStore.setState({
        userid: null,
        username: null,
        info: null,
    })
