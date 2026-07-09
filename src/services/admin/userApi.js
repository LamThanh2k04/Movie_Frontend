import api from "../axios"

export const createUser =  (data) => {
    return api.post('/user/createUser', data)
}
export const getAllUsers = (params) => {
    return api.get('/user/getAllUsers', {
        params
    })
}