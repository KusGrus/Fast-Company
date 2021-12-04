import httpService from './http.service'
import { UserService } from './types'

const apiEndPoint = 'user/'

const userService: UserService = {
    get: async () => {
        const { data } = await httpService.get(apiEndPoint)
        return data
    }
}

export default userService
