import { BaseSyntheticEvent } from 'react'

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
}

export interface UseFormConfig {
    validateOnChange?: boolean
}
