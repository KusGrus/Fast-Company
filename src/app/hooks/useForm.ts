import { BaseSyntheticEvent, useState } from 'react'
import {
    Error,
    FormControl,
    UseForm,
    UseFormChangeFn,
    UseFormCheckValidityFn,
    UseFormConfig,
    UseFormGetFn,
    UseFormRegisterFn,
    UseFormSubmitFn,
    ValidatorFn
} from './types'

const useForm = (config?: UseFormConfig): UseForm => {
    const [formGroup, setFormGroup] = useState<{ [key: string]: FormControl }>({})
    const [submitCount, setSubmitCount] = useState<number>(0)

    const parseForm = () => {
        return Object.keys(formGroup).reduce((acc, key) => ({ ...acc, [key]: formGroup[key].value }), {})
    }

    const get: UseFormGetFn = (name: string) => {
        return formGroup[name] || null
    }

    const patchValue = (name: string) => {
        return (value: string) => {
            setFormGroup(prevState => {
                prevState[name].nativeElement.value = value
                return {
                    ...prevState,
                    [name]: {
                        ...prevState[name],
                        value
                    }
                }
            })
        }
    }

    const register: UseFormRegisterFn = (validators: ValidatorFn[] = []) => {
        return (el: HTMLInputElement) => {
            if (el) {
                const name = el?.getAttribute('name') as string
                if (!formGroup[name]) {
                    setFormGroup(prevState => ({
                        ...prevState,
                        [name]: {
                            value: el?.value,
                            patchValue: patchValue(name),
                            nativeElement: el,
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
        if (formGroup[name]) {
            setFormGroup(prevState => ({
                ...prevState,
                [name]: {
                    ...prevState[name],
                    value: el?.value,
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

    const validateField = (control: Pick<FormControl, 'validators'>, newValue: any): Error[] => {
        const canValidate = config?.validateOnChange || submitCount || false
        return canValidate
            ? (control.validators?.map(fn => fn(newValue)) as Error[])?.filter(data => !!data)
            : []
    }

    const checkValidity: UseFormCheckValidityFn = () => {
        Object.keys(formGroup).forEach(key => {
            formGroup[key].errors = formGroup[key]?.validators
                ?.map(fn => fn(formGroup[key].value))
                ?.filter(data => !!data) as Error[]
        })
    }

    const isValid = () => {
        checkValidity()
        return !Object.keys(formGroup).some(key => formGroup[key]?.errors?.length)
    }


    return {
        register,
        get,
        checkValidity,
        change: handleChange,
        submit: handleSubmit,
        state: formGroup
    }
}

export default useForm
