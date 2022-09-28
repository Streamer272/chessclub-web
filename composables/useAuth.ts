interface Pair {
    [key: string]: string
}

export const useAuth = () => useState<string>('auth', () => ":")
export const useToken = (auth) => `Basic ${window.btoa(auth)}`
