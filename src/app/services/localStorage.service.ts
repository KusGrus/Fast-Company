import { FirebaseAuthResponse } from '../hooks/types'
import { LocalStorageKeys } from './types'

const setToken = ({ refreshToken, idToken, expiresIn = 3600 }: FirebaseAuthResponse) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000
    localStorage.setItem(LocalStorageKeys.TOKEN, idToken)
    localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, refreshToken)
    localStorage.setItem(LocalStorageKeys.TOKEN_EXPIRES, String(expiresDate))
}

const getAccessToken = () => {
    return localStorage.getItem(LocalStorageKeys.TOKEN)
}

const getRefreshToken = () => {
    return localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN)
}

const getTokenExpires = () => {
    return localStorage.getItem(LocalStorageKeys.TOKEN_EXPIRES)
}

const localStorageService = {
    setToken,
    getRefreshToken,
    getTokenExpires
}

export default localStorageService
