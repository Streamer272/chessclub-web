export const useAuth = () => useCookie<string>('auth', {default: () => ":"})
export const useToken = (auth) => `Basic ${window.btoa(auth)}`
