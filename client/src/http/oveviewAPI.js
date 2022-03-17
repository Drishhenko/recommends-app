import { $authHost, $host } from ".";

export const createOverview = async (overview) => {
    const {data} = await $authHost.post('api/overview', overview)
    return data
}

export const fetchOverviews = async (typeId, userId, page, limit=20) => {
    const {data} = await $host.get('api/overview', {params: {typeId, userId, page, limit}})
    
    return data
}


export const fetchOneOverview = async (id) => {
    const {data} = await $host.get('api/overview/' + id)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}