import { ProfessionDTO, QualityDTO, UserDTO } from '../../api/fake.api/api.model'

export interface ApiResponse<T> {
    data: ApiDTO<T>
}

export interface ApiDTO<T> {
    content: T
    message: string
    status: number
}

export type HttpActions = 'get' | 'post' | 'delete' | 'put'

export type HttpService<T> = {
    [key in HttpActions]: (...args: any) => Promise<ApiResponse<T>>
}

export interface UserService {
    get: () => Promise<ApiDTO<UserDTO[]>>
}

export interface ProfessionService {
    get: () => Promise<ApiDTO<ProfessionDTO[]>>
}

export interface QualityService {
    get: () => Promise<ApiDTO<QualityDTO[]>>
}
