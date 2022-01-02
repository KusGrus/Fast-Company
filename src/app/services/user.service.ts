import httpService from './http.service'
import { UserService } from './types'
import { IUser } from '../hooks/types'

const apiEndPoint = 'user/'

const userService: UserService = {
    get: async () => {
        const { data } = await httpService.get(apiEndPoint)
        return data
    },
    create: async (payload: IUser) => {
        const { data } = await httpService.put(apiEndPoint + payload._id, payload)
        return data
    },
    getById: async (id: string) => {
        const { data } = await httpService.get(apiEndPoint + id)
        return data
    },
    edit: async(id: string, payload: IUser) => {
        const { data } = await httpService.put(apiEndPoint + id, payload)
        return data
    }
}

export default userService
