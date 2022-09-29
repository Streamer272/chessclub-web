export const useAuth = () => useCookie<string>('auth')
export const useToken = (auth) => `Basic ${window.btoa(auth)}`
