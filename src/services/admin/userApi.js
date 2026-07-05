import api from "../axios"

export const getAllUsers = async (params) => {
    return api.get('/user/getAllUsers', {
        params
    })
}