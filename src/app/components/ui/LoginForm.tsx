import React from 'react'
import useForm from '../../hooks/useForm'
import InputField from '../common/form/InputField'
import Validators from '../../common/validators'
import CheckboxField from '../common/form/CheckboxField'
import { requiredText } from '../types'

const LoginForm = () => {
    const {
        register,
        get,
        change: handleChange,
        submit: handleSubmit
    } = useForm()

    const onSubmit = (data: any) => {
        console.log(data)
    }

    const emailControl = get('email')
    const passwordControl = get('password')

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField label="Email"
                ref={register(null, [
                    Validators.required({ message: requiredText }),
                    Validators.email({ message: 'Incorrect e-mail!' })
                ])}
                name="email"
                error={emailControl?.errors[0]?.message}
                value={emailControl?.value}
                onChange={handleChange}/>

            <InputField label="Password"
                ref={register(null, [
                    Validators.required({ message: requiredText }),
                    Validators.min(8, { message: 'Minimum of 8 characters!' })
                ])}
                type="password"
                name="password"
                error={passwordControl?.errors[0]?.message}
                value={passwordControl?.value}
                onChange={handleChange}/>


            <CheckboxField label="Stay signed in to your Account"
                ref={register(false)}
                name="check"
                onChange={handleChange}/>

            <button type="submit" className="btn btn-primary w-100 mx-auto">Submit</button>
        </form>
    )
}

export default LoginForm
