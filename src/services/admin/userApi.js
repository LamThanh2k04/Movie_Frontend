import api from "../axios"

export const createUser = (data) => {
    return api.post('/user/createUser', data)
}
export const updateUser = (userId, data) => {
    return api.put(`/user/updateUser/${userId}`, data)
}

export const updateUserStatus = (userId) => {
    return api.put(`/user/updateUserStatus/${userId}`)
}
export const getAllUsers = (params) => {
    return api.get('/user/getAllUsers', {
        params
    })
}