import api from "../axios"

export const getAllOverView = () => {
    return api.get('/dashboard/getAllOverView')
}

export const getMovieFavoriteUser = () => {
    return api.get('/dashboard/getMovieFavoriteUser')
}

export const getFavoriteChart = (params) => {
    return api.get('/dashboard/getFavoriteChart', {params})
}