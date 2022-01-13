import React from 'react'
import useForm from '../../hooks/useForm'
import InputField from '../common/form/InputField'
import Validators from '../../common/validators'
import CheckboxField from '../common/form/CheckboxField'
import { requiredText } from '../types'
import { SignInData } from '../../hooks/types'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from '../../store/store'
import { signIn } from '../../store/users'

const LoginForm = () => {
    const dispatch = useAppDispatch()
    const history = useHistory()
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

    const onSubmit = (payload: SignInData) => {
        const redirect = (history.location.state as any)?.from?.pathname || '/'
        dispatch(signIn({ payload, redirect }))
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
