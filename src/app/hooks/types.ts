import { BaseSyntheticEvent } from 'react'

export type ValidatorFn = (value: any) => (Error | null)
export type UseFormRegisterFn = (fn: ValidatorFn[]) => (element: HTMLInputElement) => void
export type UseFormChangeFn = (event: BaseSyntheticEvent) => void
export type UseFormSubmitFn = (fn: Function) => (event: BaseSyntheticEvent) => void
export type UseFormGetFn = (name: string) => UseFormGet | null
export type UseFormCheckValidityFn = () => void

export interface FormControl {
    value: any
    errors: Error[]
    validators?: ValidatorFn[]
}

export interface UseFormGet {
    value: any
    errors?: {[field: string]: Error[]}
    currentError?: {code: string, message?: string}
}

export interface Error {
    [code: string]: string | boolean
}

export interface UseForm {
    register: UseFormRegisterFn
    get: UseFormGetFn
    checkValidity: UseFormCheckValidityFn
    change: UseFormChangeFn
    submit: UseFormSubmitFn
    errors: {[field: string]: Error[]}
    state: {[key: string]: FormControl}
}

export interface UseFormConfig {
    validateOnChange?: boolean
    submitAnyway?: boolean
}
