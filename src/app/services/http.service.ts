import axios from 'axios'
import { toast } from 'react-toastify'
import { HttpService } from './types'


const http = axios.create({
    baseURL: process.env.REACT_APP_FIREBASE_URL || process.env.REACT_APP_DEFAULT_BACKEND
})

http.interceptors.request.use(
    config => {
        if (process.env.REACT_APP_FIREBASE_URL) {
            const containSlash = /\/$/gi.test(<string>config.url)
            config.url = (containSlash ? config.url?.slice(0, -1) : config.url) + '.json'
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
