import React from 'react'
import useForm from '../../hooks/useForm'
import InputField from '../common/form/InputField'
import Validators from '../../common/validators'
import CheckboxField from '../common/form/CheckboxField'
import { requiredText } from '../types'
import { useAuth } from '../../hooks/useAuth'
import { SignInData } from '../../hooks/types'

const LoginForm = () => {
    const { signIn } = useAuth()
    const { state, submit } = useForm({
        email: ['', [
            Validators.required({ message: requiredText }),
            Validators.email({ message: 'Incorrect e-mail!' })
        ]],
        password: ['', [
            Validators.required({ message: requiredText }),
            Validators.min(8, { message: 'Minimum of 8 characters!' })
        ]],
        check: [false]
    })

    const onSubmit = async (data: SignInData) => {
        try {
            await signIn(data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={submit(onSubmit)}>
            <InputField label="Email"
                value={state.email.value}
                error={state.email.errors[0]?.message}
                onChange={state.email.patchValue}/>

            <InputField label="Password"
                type="password"
                value={state.password.value}
                error={state.password.errors[0]?.message}
                onChange={state.password.patchValue}/>

            <CheckboxField label="Stay signed in to your Account"
                value={state.check.value}
                onChange={state.check.patchValue}/>

            <button type="submit" className="btn btn-primary w-100 mx-auto">Submit</button>
        </form>
    )
}

export default LoginForm
