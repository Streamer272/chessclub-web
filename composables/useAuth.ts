import {Buffer} from 'buffer'

interface Pair {
    [key: string]: string
}

export const useAuth = () => useState<string>('auth', () => ":")
export const useToken = () => `Basic ${Buffer.from(useAuth().value, 'binary').toString('base64')}`
