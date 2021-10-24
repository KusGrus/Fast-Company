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
        return (value: any) => {
            setFormGroup(prevState => {
                if (prevState[name].nativeElement) {
                    prevState[name].nativeElement!.value = value
                }
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

    const register: UseFormRegisterFn = (defaultValue: any, validators: ValidatorFn[] = []) => {
        return (element: HTMLInputElement | string) => {
            if (element) {
                if (typeof element === 'string') {
                    if (!formGroup[element]) {
                        setFormGroup(prevState => ({
                            ...prevState,
                            [element]: {
                                value: defaultValue,
                                patchValue: patchValue(element),
                                validators: validators,
                                errors: validateField({ validators }, defaultValue)
                            }
                        }))
                    }
                } else {
                    if (element.getAttribute('type') === 'radio' && !element.checked) {
                        return
                    }
                    let value: any
                    const name = element.getAttribute('name') as string
                    if (element.getAttribute('type') === 'checkbox') {
                        value = defaultValue || element.checked
                        element.checked = defaultValue || element.checked
                    } else {
                        value = defaultValue || element?.value
                    }
                    if (!formGroup[name] && element) {
                        setFormGroup(prevState => ({
                            ...prevState,
                            [name]: {
                                value: value,
                                patchValue: patchValue(name),
                                nativeElement: element,
                                validators: validators,
                                errors: validateField({ validators }, value)
                            }
                        }))
                    }
                }
            }
        }
    }

    const handleChange: UseFormChangeFn = (event: BaseSyntheticEvent | string, newValue?: any) => {
        let value: any
        let name: string
        if (typeof event === 'string') {
            name = event
            value = newValue
        } else {
            name = event.target.getAttribute('name') as string
            if (event.target.getAttribute('type') === 'checkbox') {
                value = event.target.checked
            } else {
                value = newValue || event.target.value
            }
        }
        if (formGroup[name]) {
            setFormGroup(prevState => ({
                ...prevState,
                [name]: {
                    ...prevState[name],
                    value,
                    errors: validateField(prevState[name], value)
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
