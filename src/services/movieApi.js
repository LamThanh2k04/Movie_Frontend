import api from "./axios"

export const createMovie = (data) => {
    return api.post('/movie/createMovie', data)
}

export const updateMovie = (movieId, data) => {
    return api.put(`/movie/updateMovie/${movieId}`, data)
}

export const updateMovieStatus = (movieId) => {
    return api.put(`/movie/updateMovieStatus/${movieId}`)
}

export const getAllMovies = (params) => {
    return api.get('/movie/getAllMovies', { params })
}

export const getInfoMovie = (movieId) => {
    return api.get(`/movie/getInfoMovie/${movieId}`)
}

export const getMoviesBySearch = (params) => {
    return api.get('/movie/getMoviesBySearch', { params })
}

export const getMovieRandom = () => {
    return api.get('/movie/getMovieRandom')
}

export const getAllMoviesRandom = () => {
    return api.get('/movie/getAllMoviesRandom')
}

export const getMoviesFavorite = () => {
    return api.get('/movie/getMoviesFavorite')
}

export const getFavoriteMovieUser = () => {
    return api.get('/user/getFavoriteMovieUser')
}

