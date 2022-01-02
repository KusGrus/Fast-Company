import axios from 'axios'
import { toast } from 'react-toastify'
import { HttpService } from './types'
import { httpAuth } from '../hooks/useAuth'
import localStorageService from './localStorage.service'


const http = axios.create({
    baseURL: process.env.REACT_APP_FIREBASE_URL || process.env.REACT_APP_DEFAULT_BACKEND
})

http.interceptors.request.use(
    async (config) => {
        if (process.env.REACT_APP_FIREBASE_URL) {
            const containSlash = /\/$/gi.test(<string>config.url)
            config.url = (containSlash ? config.url?.slice(0, -1) : config.url) + '.json'
            const expiresDate = parseInt(localStorageService.getTokenExpires() as string)
            const refreshToken = localStorageService.getRefreshToken()
            if (refreshToken && expiresDate < Date.now()) {
                const { data } = await httpAuth.post('token', {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                })
                localStorageService.setToken({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                })
            }
            const accessToken = localStorageService.getAccessToken()
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken }
            }
        }
        return config
    },
    error => Promise.reject(error)
)

http.interceptors.response.use(
    res => {
        if (process.env.REACT_APP_FIREBASE_URL) {
            res.data = { content: transformData(res.data) }
        }
        return res
    },
    e => {
        const expectedErrors = e.response && e.response.status >= 400 && e.response.status < 500
        if (!expectedErrors) {
            toast.error('Something was wrong. Try it later.')
        }
        return Promise.reject(e)
    })

function transformData(data: any) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
            ...data[key]
        }))
        : data
}

const httpService: HttpService<any> = {
    get: http.get,
    post: http.post,
    delete: http.delete,
    put: http.put
}

export default httpService
