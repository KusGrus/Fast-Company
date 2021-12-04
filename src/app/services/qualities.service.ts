import httpService from './http.service'
import { QualityService } from './types'

const apiEndPoint = 'quality/'

const qualityService: QualityService = {
    get: async () => {
        const { data } = await httpService.get(apiEndPoint)
        return data
    }
}

export default qualityService
