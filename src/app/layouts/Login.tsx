import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import RegisterForm from '../components/ui/RegisterForm'
import LoginForm from '../components/ui/LoginForm'

enum FormType {
    LOGIN = 'login',
    REGISTER = 'register',
}

const Login = () => {
    const { type } = useParams<{ type: FormType }>()
    const [formType, setFormType] = useState<FormType>(type === FormType.REGISTER ? type : FormType.LOGIN)

    let title
    let Form
    let message

    const toggleFormType = () => {
        setFormType(prevState => prevState === FormType.REGISTER ? FormType.LOGIN : FormType.REGISTER)
    }

    if (formType === FormType.REGISTER) {
        title = 'Register'
        Form = RegisterForm
        message = <p>Already have account? <a role="button" onClick={toggleFormType}>Sign In</a></p>
    } else {
        title = 'Login'
        Form = LoginForm
        message = <p>Dont have account? <a role="button" onClick={toggleFormType}>Sign Up</a></p>
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">{title}</h3>
                    <Form/>
                    {message}
                </div>
            </div>
        </div>
    )
}

export default Login
