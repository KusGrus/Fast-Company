import httpService from './http.service'
import { CommentService } from './types'

const apiEndPoint = 'comment/'

const commentService: CommentService = {
    add: async (comment) => {
        const { data } = await httpService.put(apiEndPoint + comment._id, comment)
        return data
    },
    get: async (pageId: string) => {
        const { data } = await httpService.get(apiEndPoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        })
        return data
    },
    delete: async (id: string) => {
        const { data } = await httpService.delete(apiEndPoint + id)
        return data
    }
}

export default commentService
