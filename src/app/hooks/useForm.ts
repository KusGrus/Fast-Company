import { BaseSyntheticEvent, useRef, useState } from 'react'
import { Error, UseForm, UseFormConfig, UseFormInit, UseFormState, UseFormSubmitFn, ValidatorFn } from './types'

const useForm = (form: UseFormInit, config?: UseFormConfig): UseForm => {
    const canValidate = useRef<boolean>(!!config?.validateOnChange)

    const pretty = (): { [key: string]: any } => {
        return Object.keys(state).reduce((acc, key) => ({ ...acc, [key]: state[key].value }), {})
    }

    const _validateControl = (name: string, value: any, validators?: ValidatorFn[]): { valid: boolean, errors: Error[] } => {
        if (canValidate.current) {
            const validatorFns = validators || state[name].validators || []
            const errors: Error[] = validatorFns.map(fn => fn(value)).filter(Boolean) as Error[]
            return { errors, valid: !errors.length }
        } else {
            return { errors: [], valid: true }
        }
    }

    const _validateForm = (): void => {
        const copy = { ...state }
        Object.keys(copy).forEach(key => {
            const { valid = true, errors = [] } = _validateControl(key, copy[key].value, copy[key].validators)
            copy[key].valid = valid
            copy[key].errors = errors
        })
        setState(copy)
    }

    const reset = (): void => {
        const copy = { ...state }
        Object.keys(copy).forEach(key => {
            copy[key].value = null
            copy[key].errors = []
            copy[key].valid = true
        })
        canValidate.current = false
        setState(copy)
    }

    const isValid = (): boolean => {
        return Object.keys(state).every(key => state[key].valid)
    }

    const patchValue = (name: string, value: any) => {
        if (state[name]) {
            setState(prevState => {
                const { valid = true, errors = [] } = _validateControl(name, value)
                return {
                    ...prevState,
                    [name]: {
                        ...prevState[name], touched: true, valid, errors, value
                    }
                }
            })
        }
    }

    const patchValueForm = (data: {[key: string]: any}) => {
        setState(prevState => {
            const newData = Object.keys(data).reduce((acc, current) => ({
                ...acc,
                [current]: {
                    ...prevState[current], value: data[current]
                }
            }), {})
            return { ...prevState, ...newData } as any
        })
    }

    const setError = (name: string, error: Error) => {
        const control = state[name]
        if (control) {
            setState(prevState => ({
                ...prevState,
                [name]: {
                    ...prevState[name],
                    errors: [...prevState[name].errors, error]
                }
            }))
        }
    }

    const _namedPatchValue = (name: string) => {
        return (value: any) => patchValue(name, value)
    }

    const init = (data: UseFormInit): UseFormState => {
        return Object.keys(data).reduce((acc, key) => {
            const value = data[key][0]
            const validators = data[key][1] || []
            const { valid = true, errors = [] } = _validateControl('', value, validators)
            return {
                ...acc,
                [key]: { value, validators, valid, errors, touched: false, patchValue: _namedPatchValue(key) }
            }
        }, {})
    }

    const [state, setState] = useState<UseFormState>(init(form))

    const submit: UseFormSubmitFn = (fn: Function) => {
        return (event: BaseSyntheticEvent) => {
            event.preventDefault()
            canValidate.current = true
            _validateForm()
            const prettyObject = pretty()
            if (isValid()) {
                fn(prettyObject)
            }
        }
    }

    return { submit, state, setError, reset, patchValue: patchValueForm }
}

export default useForm
