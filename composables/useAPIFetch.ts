import axios from "axios";

export interface GenericResponse {
    response: string
}

interface Options {
    method?: string
    body?: object
    auth?: Auth
}

export const useAPIFetch = async <T = object>(uri: string, options: Options = {}) => {
    const auth = useAuth()
    return await axios.request<T>({
            method: options.method ?? "GET",
            url: `https://api.chessclub.streamer272.com${uri}`,
            auth: {
                username: options.auth ? options.auth.username : auth.value.split(':')[0],
                password: options.auth ? options.auth.password : auth.value.split(':')[1]
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
        if (error?.status === 404)
            router.push('/404')
        router.push('/ohmyfuckinggod')
    }
}
