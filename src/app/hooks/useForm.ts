import { BaseSyntheticEvent, useState } from 'react'
import { Error, UseForm, UseFormConfig, UseFormInit, UseFormState, UseFormSubmitFn } from './types'

const useForm = (form: UseFormInit, config?: UseFormConfig): UseForm => {
    const pretty = (): {[key: string]: any} => {
        return Object.keys(state).reduce((acc, key) => ({ ...acc, [key]: state[key].value }), {})
    }

    const _validateControl = (name: string, value: any): {valid: boolean, errors: Error[]} => {
        const errors: Error[] = state[name].validators.map(fn => fn(value)).filter(Boolean) as Error[]
        return {
            errors,
            valid: !errors.length
        }
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

    const _namedPatchValue = (name: string) => {
        return (value: any) => patchValue(name, value)
    }

    const init = (data: UseFormInit): UseFormState => {
        return Object.keys(data).reduce((acc, key) => ({
            ...acc,
            [key]: {
                value: data[key][0],
                validators: data[key][1] || [],
                touched: false,
                valid: true,
                errors: [],
                patchValue: _namedPatchValue(key)
            }
        }), {})
    }

    const [state, setState] = useState<UseFormState>(init(form))

    const submit: UseFormSubmitFn = (fn: Function) => {
        return (event: BaseSyntheticEvent) => {
            event.preventDefault()
            const prettyObject = pretty()
            if (isValid()) {
                fn(prettyObject)
            }
        }
    }

    return { submit, state }
}

export default useForm
