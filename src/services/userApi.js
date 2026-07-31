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

export const getFavoriteMovieUser = () => {
    return api.get('/user/getFavoriteMovieUser')
}

export const addFavoriteMovie = (movieId) => {
    return api.post(`/user/addFavoriteMovie/${movieId}`)
}

export const removeFavoriteMovie = (movieId) => {
    return api.post(`/user/removeFavoriteMovie/${movieId}`)
}

export const checkFavoriteMovie = (movieId) => {
    return api.get(`/user/checkFavoriteMovie/${movieId}`)
}