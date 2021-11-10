import httpService from './http.service'
import { ProfessionService } from './types'

const apiEndPoint = 'profession/'

const professionService: ProfessionService = {
    get: async () => {
        const { data } = await httpService.get(apiEndPoint)
        return data
    }
}

export default professionService
