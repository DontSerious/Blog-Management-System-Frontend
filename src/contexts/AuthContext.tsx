import { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextProps {
    statusCode: number | null;
    statusMsg: string | null;
    setAuthData: (status_code: number, status_msg: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [statusCode, setStatusCode] = useState<number | null>(null);
    const [statusMsg, setStatusMsg] = useState<string | null>(null);

    const setAuthData = (newStatusCode: number, newStatusMsg: string) => {
        setStatusCode(newStatusCode);
        setStatusMsg(newStatusMsg);
    };

    return (
        <AuthContext.Provider value={{ statusCode, statusMsg, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
