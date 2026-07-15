import api from "../axios"

export const createGenre = (data) => {
    return api.post('/genre/createGenre', data)
}

export const updateGenre = (genreId, data) => {
    return api.put(`/genre/updateGenre/${genreId}`, data)
}

export const updateGenreStatus = (genreId) => {
    return api.put(`/genre/updateGenreStatus/${genreId}`)
}

export const getAllGenres = (params) => {
    return api.get('/genre/getAllGenres', { params })
}

export const getAllGenresSimple = () => {
    return api.get('/genre/getAllGenresSimple')
}       