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

export const deleteOneOwverview = async (id) => {
    const {data} = await $authHost.delete('api/overview', {params: {id}} )
    console.log('deleteData', data)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createRate = async (rating) => {
    const {data} = await $authHost.post('api/overview/overal-rating', rating)
    return data
}

export const createComment = async (comment) => {
    const {data} = await $authHost.post('api/overview/comments', comment)
    return data
}
