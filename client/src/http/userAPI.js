import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode"

export const registration = async (email, password, name) => {
    const {data} = await $host.post('api/user/registration', {email, password, name})
    localStorage.setItem('token', data.token)
    localStorage.setItem('name', data.name)
    localStorage.setItem('role', data.role)
    localStorage.setItem('id', data.id)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    localStorage.setItem('name', data.name)
    localStorage.setItem('id', data.id)
    localStorage.setItem('role', data.role)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchOneUser = async (id) => {
    const {data} = await $host.get('api/user/' + id)  
    return data
}

export const fetchUsers = async () => {
    const {data} = await $host.get('api/user')
    return data
}