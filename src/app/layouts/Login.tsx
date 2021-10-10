import React from 'react'
import TextField from '../components/TextField'
import useForm from '../hooks/useForm'
import Validators from '../common/validators'

const Login = () => {
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField ref={register([
                            Validators.required({ message: requiredText }),
                            Validators.email({ message: 'Incorrect e-mail!' })
                        ])}
                        label="Email"
                        name="email"
                        error={emailControl?.currentError?.message}
                        value={emailControl?.value}
                        onChange={handleChange}/>
                        <TextField ref={register([
                            Validators.required({ message: requiredText }),
                            Validators.min(8, { message: 'Minimum of 8 characters!' })
                        ])}
                        label="Password"
                        type="password"
                        name="password"
                        error={passwordControl?.currentError?.message}
                        value={passwordControl?.value}
                        onChange={handleChange}/>
                        <button type="submit" className="btn btn-primary w-100 mx-auto">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
