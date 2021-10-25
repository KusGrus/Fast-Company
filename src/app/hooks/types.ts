import { BaseSyntheticEvent } from 'react'

export type ValidatorFn = (value: any) => (Error | null)
export type UseFormRegisterFn = (defaultValue: any, fn?: ValidatorFn[]) => (element: HTMLInputElement | string) => void
export type UseFormChangeFn = (event: (BaseSyntheticEvent | string), ...args: any[]) => void
export type UseFormSubmitFn = (fn: Function) => (event: BaseSyntheticEvent) => void
export type UseFormGetFn = (name: string) => FormControl | null
export type UseFormCheckValidityFn = () => void

export interface FormControl {
    value: any
    errors: Error[]
    validators?: ValidatorFn[]
    patchValue: (value: any) => void
    nativeElement?: HTMLInputElement
}

export interface Error {
    code: string
    message?: string
}

export interface UseForm {
    register: UseFormRegisterFn
    get: UseFormGetFn
    checkValidity: UseFormCheckValidityFn
    change: UseFormChangeFn
    submit: UseFormSubmitFn
    state: { [key: string]: FormControl }
}

export interface UseFormConfig {
    validateOnChange?: boolean
    submitAnyway?: boolean
}
