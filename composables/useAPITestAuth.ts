export interface Auth {
    username: string
    password: string
}

export const useAPITestAuth = async (auth?: Auth) => {
    return await useAPIFetch("/test", {
        auth: auth
    })
}
