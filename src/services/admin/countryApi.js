import api from "../axios"

export const createCountry = (data) => {
    return api.post('/country/createCountry', data)
}

export const updateCountry = (countryId, data) => {
    return api.put(`/country/updateCountry/${countryId}`, data)
}

export const updateCountryStatus = (countryId) => {
    return api.put(`/country/updateCountryStatus/${countryId}`)
}

export const getAllCountries = (params) => {
    return api.get('/country/getAllCountries', { params })
}

export const getAllCountriesSimple = () => {
    return api.get('/country/getAllCountries')
}