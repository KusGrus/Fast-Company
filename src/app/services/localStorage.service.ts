import { FirebaseAuthResponse } from '../hooks/types'
import { LocalStorageKeys } from './types'

const setToken = ({ refreshToken, idToken, localId, expiresIn = 3600 }: FirebaseAuthResponse) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000
    localStorage.setItem(LocalStorageKeys.TOKEN, idToken)
    localStorage.setItem(LocalStorageKeys.LOCAL_ID, localId)
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

const getLocalId = () => {
    return localStorage.getItem(LocalStorageKeys.LOCAL_ID)
}

const reset = () => {
    localStorage.removeItem(LocalStorageKeys.TOKEN)
    localStorage.removeItem(LocalStorageKeys.LOCAL_ID)
    localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN)
    localStorage.removeItem(LocalStorageKeys.TOKEN_EXPIRES)
}

const localStorageService = {
    setToken,
    getAccessToken,
    getRefreshToken,
    getTokenExpires,
    getLocalId,
    reset
}

export default localStorageService
