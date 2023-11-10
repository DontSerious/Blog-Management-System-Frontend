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