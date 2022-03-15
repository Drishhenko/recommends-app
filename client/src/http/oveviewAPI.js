import { $authHost, $host } from ".";

export const createOverview = async (overview) => {
    const {data} = await $authHost.post('api/overview', overview)
    return data
}

export const fetchOverviews = async () => {
    const {data} = await $host.get('api/overview')
    console.log('overviews', data)
    return data
}

export const fetchOneOverview = async (id) => {
    const {data} = await $host.get('api/overview' + id)
    return data
}