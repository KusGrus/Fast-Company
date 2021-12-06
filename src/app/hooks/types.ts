import { BaseSyntheticEvent } from 'react'
import { ProfessionDTO, QualityDTO, UserDTO } from '../../api/fake.api/api.model'

export type ValidatorFn = (value: any) => Error | null
export type UseFormSubmitFn = (fn: Function) => (event: BaseSyntheticEvent) => void
export type UseFormSetErrorFn = (name: string, error: Error) => void

export const enum AuthErrorMap {
    EMAIL_EXISTS = 'EMAIL_EXISTS',
    EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
    INVALID_PASSWORD = 'INVALID_PASSWORD'
}

export interface Error {
    code: string
    message: string
}

export interface FormControl {
    value: any
    errors: Error[]
    valid: boolean
    touched: boolean
    validators: ValidatorFn[]
    patchValue: (value: any) => void
}

export interface UseFormInit {
    [key: string]: [any, ValidatorFn[]?]
}

export interface UseFormState {
    [key: string]: FormControl
}

export interface UseForm {
    state: UseFormState
    submit: UseFormSubmitFn
    setError: UseFormSetErrorFn
    reset: () => void
}

export interface UseFormConfig {
    validateOnChange?: boolean
}

export interface UseUserContext {
    users: UserDTO[]
}

export interface UseProfessionContext {
    professions: ProfessionDTO[]
    isLoading: boolean
    getProfessionById: (id: string) => ProfessionDTO | undefined
}

export interface UseQualityContext {
    qualities: QualityDTO[]
    isLoading: boolean
    getQualityById: (id: string) => QualityDTO | undefined
}

export interface UseAuthContext {
    signUp: (signUpData: SignUpData) => Promise<void>
    signIn: (signUpData: SignInData) => Promise<void>
    user: SignUpData | undefined
}

export interface SignInData {
    email: string
    password?: string
}

export interface SignUpData extends SignInData {
    _id?: string
    licence: boolean
    profession: string
    qualities: string[]
    sex: string;
}

export interface FirebaseAuthResponse {
    email: string
    refreshToken: string
    idToken: string
    expiresIn: number
    localId: string
}

export interface FirebaseAuthErrors {
    response: {
        data: {
            error: {
                code: number
                errors: Array<{ message: string, domain: string, reason: string }>
                message: string
            }
        }
    }
}

export const ErrorMessageMap: Record<AuthErrorMap | string, string> = {
    [AuthErrorMap.EMAIL_EXISTS]: 'This email is already exist',
    [AuthErrorMap.EMAIL_NOT_FOUND]: 'Invalid email or password',
    [AuthErrorMap.INVALID_PASSWORD]: 'Invalid email or password'
}
