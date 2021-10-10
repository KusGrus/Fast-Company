import { BaseSyntheticEvent, useState } from 'react'
import {
    Error,
    FormControl,
    UseForm,
    UseFormChangeFn,
    UseFormCheckValidityFn,
    UseFormConfig,
    UseFormGet,
    UseFormGetFn,
    UseFormRegisterFn,
    UseFormSubmitFn,
    ValidatorFn
} from './types'

const useForm = (config?: UseFormConfig): UseForm => {
    const [formState, setFormState] = useState<{ [key: string]: FormControl }>({})
    const [submitCount, setSubmitCount] = useState<number>(0)

    const parseForm = () => {
        return Object.keys(formState).reduce((acc, key) => ({ ...acc, [key]: formState[key].value }), {})
    }

    const errors = (): { [field: string]: Error[] } => {
        return Object.keys(formState).reduce((acc, key) => ({ ...acc, [key]: formState[key].errors }), {})
    }

    const register: UseFormRegisterFn = (validators: ValidatorFn[] = []) => {
        return (el: HTMLInputElement) => {
            if (el) {
                const name = el?.getAttribute('name') as string
                if (!formState[name]) {
                    setFormState(prevState => ({
                        ...prevState,
                        [name]: {
                            value: el?.value,
                            validators: validators,
                            errors: validateField({ validators }, el?.value)
                        }
                    }))
                }
            }
        }
    }

    const handleChange: UseFormChangeFn = (event: BaseSyntheticEvent) => {
        const el = event.target
        const name = el.getAttribute('name') as string
        if (formState[name]) {
            setFormState(prevState => ({
                ...prevState,
                [name]: {
                    value: el?.value,
                    validators: prevState[name].validators,
                    errors: validateField(prevState[name], el?.value)
                }
            }))
        }
    }

    const handleSubmit: UseFormSubmitFn = (fn: Function) => {
        return (event: BaseSyntheticEvent) => {
            event.preventDefault()
            setSubmitCount(prevState => ++prevState)
            if (config?.submitAnyway) {
                fn(parseForm())
            } else if (isValid()) {
                fn(parseForm())
            }
        }
    }

    const get: UseFormGetFn = (name: string) => {
        const field = formState[name]
        if (field) {
            let currentError
            if (field.errors.length) {
                const currentErrorCode = Object.keys(field.errors[0])[0]
                const message = field.errors[0]?.[currentErrorCode] as string
                currentError = { code: currentErrorCode, message }
            }
            return {
                value: field.value,
                errors: field.errors,
                currentError
            } as unknown as UseFormGet
        }
        return null
    }

    const validateField = (control: Pick<FormControl, 'validators'>, newValue: any): Error[] => {
        let canValidate = false
        if (config?.validateOnChange || submitCount) {
            canValidate = true
        }
        return canValidate
            ? (control.validators?.map(fn => fn(newValue)) as Error[])?.filter(data => !!data)
            : []
    }

    const checkValidity: UseFormCheckValidityFn = () => {
        Object.keys(formState).forEach(key => {
            formState[key].errors = formState[key]?.validators
                ?.map(fn => fn(formState[key].value))
                ?.filter(data => !!data) as Error[]
        })
    }

    const isValid = () => {
        checkValidity()
        return !Object.keys(formState).some(key => formState[key]?.errors?.length)
    }

    return {
        register,
        get,
        checkValidity,
        change: handleChange,
        submit: handleSubmit,
        errors: errors(),
        state: formState
    }
}

export default useForm
