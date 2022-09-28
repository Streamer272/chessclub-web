
// TODO: change url in production

import axios from "axios";

interface Options {
    method?: string
    headers?: Headers
    body?: BodyInit
}

export const useAPIFetch = (uri: string, options: Options) => {
    const auth = useAuth()
    return axios.request({
        method: options.method,
        url: `http://localhost:8080${uri}`,
        auth: {
            username: auth.value.split(':')[0],
            password: auth.value.split(':')[1]
        },
        headers: {
            "Content-Type": "application/json",
        },
        data: ["GET", "HEAD"].includes(options.method.toUpperCase()) ? undefined : JSON.stringify(options.body ?? {})
    })
}
