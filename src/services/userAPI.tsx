import axios from 'axios';
import { BE_SERVER } from '../constants';

const api = axios.create({
    baseURL: BE_SERVER
})

export const login = (formData: any) => {
    return api.post('/login', formData)
}

export const register = (formData: any) => {
    return api.post('/register', formData)
}

export const queryInfo = (user_id: any) => {
    return api.get('/queryInfo', {
        params: {
            _id: user_id
        }
    })
}

export const updateInfo = (formData: any) => {
    return api.get('/updateInfo', formData)
}