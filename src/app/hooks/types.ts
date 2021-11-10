import { BaseSyntheticEvent } from 'react'
import { ProfessionDTO, QualityDTO, UserDTO } from '../../api/fake.api/api.model'

export type ValidatorFn = (value: any) => Error | null
export type UseFormSubmitFn = (fn: Function) => (event: BaseSyntheticEvent) => void

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
