import axios from 'axios'
import { toast } from 'react-toastify'
import config from '../config.json'
import { HttpService } from './types'

axios.defaults.baseURL = config.apiUrl

axios.interceptors.response.use(res => res, e => {
    const expectedErrors = e.response && e.response.status >= 400 && e.response.status < 500
    if (!expectedErrors) {
        toast.error('Something was wrong. Try it later.')
    }
    return Promise.reject(e)
})

const httpService: HttpService<any> = {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put
}

export default httpService
