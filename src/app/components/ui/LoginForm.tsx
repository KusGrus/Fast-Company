import React from 'react'
import useForm from '../../hooks/useForm'
import TextField from '../common/form/TextField'
import Validators from '../../common/validators'

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

    const requiredText = 'This field is required'
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField ref={register([
                Validators.required({ message: requiredText }),
                Validators.email({ message: 'Incorrect e-mail!' })
            ])}
            label="Email"
            name="email"
            error={emailControl?.errors[0]?.message}
            value={emailControl?.value}
            onChange={handleChange}/>
            <TextField ref={register([
                Validators.required({ message: requiredText }),
                Validators.min(8, { message: 'Minimum of 8 characters!' })
            ])}
            label="Password"
            type="password"
            name="password"
            error={passwordControl?.errors[0]?.message}
            value={passwordControl?.value}
            onChange={handleChange}/>
            <button type="submit" className="btn btn-primary w-100 mx-auto">Submit</button>
        </form>
    )
}

export default LoginForm
