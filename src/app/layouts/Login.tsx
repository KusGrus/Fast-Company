import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import RegisterForm from '../components/ui/RegisterForm'
import LoginForm from '../components/ui/LoginForm'
import Form from '../components/common/Form'

enum FormType {
    LOGIN = 'login',
    REGISTER = 'register',
}

const Login = () => {
    const { type } = useParams<{ type: FormType }>()
    const [formType, setFormType] = useState<FormType>(type === FormType.REGISTER ? type : FormType.LOGIN)

    let title
    let FormSection
    let message

    const toggleFormType = () => {
        setFormType(prevState => prevState === FormType.REGISTER ? FormType.LOGIN : FormType.REGISTER)
    }

    if (formType === FormType.REGISTER) {
        title = 'Register'
        FormSection = RegisterForm
        message = <p>Already have account? <a role="button" onClick={toggleFormType}>Sign In</a></p>
    } else {
        title = 'Login'
        FormSection = LoginForm
        message = <p>Dont have account? <a role="button" onClick={toggleFormType}>Sign Up</a></p>
    }

    return <Form title={title}><FormSection/>{message}</Form>
}

export default Login
