import { create } from 'zustand';

interface State {
    statusMsg: string | null;
}

export const useAuthState = create<State>()(() => ({
    statusMsg: null,
}))

export const setAuth = (statusMsg: State['statusMsg']) => 
    useAuthState.setState({
        statusMsg: statusMsg
    })
