import { ProfessionDTO, QualityDTO, UserDTO } from '../../api/fake.api/api.model'
import { SignUpData } from '../hooks/types'

export interface ApiResponse<T> {
    data: ApiDTO<T>
}

export interface ApiDTO<T> {
    content: T
    message: string
    status: number
}

export const enum LocalStorageKeys {
    TOKEN = 'jwt-token',
    REFRESH_TOKEN = 'jwt-refresh-token',
    TOKEN_EXPIRES = 'jwt-refresh-expires'
}

export type HttpActions = 'get' | 'post' | 'delete' | 'put'

export type HttpService<T> = {
    [key in HttpActions]: (...args: any) => Promise<ApiResponse<T>>
}

export interface UserService {
    get: () => Promise<ApiDTO<UserDTO[]>>
    create: (args: SignUpData) => Promise<ApiDTO<SignUpData>>
    getById: (id: string) => Promise<ApiDTO<SignUpData>>
}

export interface ProfessionService {
    get: () => Promise<ApiDTO<ProfessionDTO[]>>
}

export interface QualityService {
    get: () => Promise<ApiDTO<QualityDTO[]>>
}
