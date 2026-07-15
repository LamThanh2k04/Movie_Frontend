import api from "../axios"

export const createActor = (data) => {
    return api.post('/actor/createActor', data)
}

export const updateActor = (actorId, data) => {
    return api.put(`/actor/updateActor/${actorId}`, data)
}

export const updateActorStatus = (actorId) => {
    return api.put(`/actor/updateActorStatus/${actorId}`)
}

export const getAllActors = (params) => {
    return api.get('/actor/getAllActors', { params })
}

export const getAllActorsSimple = () => {
    return api.get('/actor/getAllActorsSimple')
}