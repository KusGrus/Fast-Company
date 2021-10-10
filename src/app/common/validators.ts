import { ValidatorFn } from '../hooks/types'

interface ValidatorConfig {
    message?: string
}

function max(n: number, config?: ValidatorConfig): ValidatorFn {
    return (value: string | number) => {
        const errorValue = config?.message || true
        if (typeof value === 'string') {
            return value.length > n ? { max: errorValue } : null
        } else {
            return value > n ? { max: errorValue } : null
        }
    }
}

function min(n: number, config?: ValidatorConfig): ValidatorFn {
    return (value: string | number) => {
        const errorValue = config?.message || true
        if (typeof value === 'string') {
            return value.length < n ? { min: errorValue } : null
        } else {
            return value < n ? { min: errorValue } : null
        }
    }
}

function email(config?: ValidatorConfig): ValidatorFn {
    return (value: string) => {
        const errorValue = config?.message || true
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regExp.test(value) ? null : { email: errorValue }
    }
}

function required(config?: ValidatorConfig): ValidatorFn {
    return (value: string) => {
        const errorValue = config?.message || true
        return value.length ? null : { required: errorValue }
    }
}

export default {
    max,
    min,
    email,
    required
}
