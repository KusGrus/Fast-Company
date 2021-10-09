import React, { BaseSyntheticEvent, useState } from 'react'
import TextField from '../components/TextField'

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: BaseSyntheticEvent) => {
        setData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e: BaseSyntheticEvent) => {
        e.preventDefault()
        console.log(e)
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField label="Email" type="email" name="email" value={data.email} onChange={handleChange}/>
            <TextField label="Password" type="password" name="password" value={data.password} onChange={handleChange}/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Login
