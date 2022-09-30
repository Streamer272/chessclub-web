// TODO: change url in production

import axios from "axios";

export interface GenericResponse {
    response: string
}

interface Options {
    method?: string
    body?: object
}

export const useAPIFetch = async <T = object>(uri: string, options: Options = {}) => {
    const auth = useAuth()
    return await axios.request<T>({
            method: options.method ?? "GET",
            url: `http://localhost:8080${uri}`,
            auth: {
                username: auth.value.split(':')[0],
                password: auth.value.split(':')[1]
            },
            headers: {
                "Content-Type": "application/json"
            },
            data: ["GET", "HEAD"].includes((options.method ?? "GET").toUpperCase()) ? undefined : JSON.stringify(options.body ?? {})
        }
    )
}

export const useAPIErrorHandler = () => {
    return (error: any) => {
        const router = useRouter()
        router.push("/ohmyfuckinggod")
    }
}
