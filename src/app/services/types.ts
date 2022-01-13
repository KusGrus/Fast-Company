import { ProfessionDTO, QualityDTO } from '../../api/fake.api/api.model'
import { CommentDTO, FirebaseAuthResponse, IUser, SignInData } from '../hooks/types'

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
    LOCAL_ID = 'user-local-id',
    REFRESH_TOKEN = 'jwt-refresh-token',
    TOKEN_EXPIRES = 'jwt-expires'
}

export type HttpActions = 'get' | 'post' | 'delete' | 'put'

export type HttpService<T> = {
    [key in HttpActions]: (...args: any) => Promise<ApiResponse<T>>
}

export interface UserService {
    get: () => Promise<ApiDTO<IUser[]>>
    create: (args: IUser) => Promise<ApiDTO<IUser>>
    getById: (id: string) => Promise<ApiDTO<IUser>>
    edit: (id: string, payload: IUser) => Promise<ApiDTO<IUser>>
}

export interface ProfessionService {
    get: () => Promise<ApiDTO<ProfessionDTO[]>>
}

export interface QualityService {
    get: () => Promise<ApiDTO<QualityDTO[]>>
}

export interface CommentService {
    add: (comment: CommentDTO) => Promise<ApiDTO<CommentDTO>>
    get: (pageId: string) => Promise<ApiDTO<CommentDTO[]>>
    delete: (id: string) => Promise<ApiDTO<CommentDTO>>
}

export interface AuthService {
    signUp: (user: IUser) => Promise<FirebaseAuthResponse>
    signIn: (data: SignInData) => Promise<FirebaseAuthResponse>
    edit: (id: string, user: IUser) => Promise<IUser>
}
