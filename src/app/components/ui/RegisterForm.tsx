import React, { useEffect, useRef, useState } from 'react'
import useForm from '../../hooks/useForm'
import TextField from '../common/form/TextField'
import Validators from '../../common/validators'
import api from '../../../api'
import { ProfessionDTO } from '../../../api/fake.api/user.api.model'
import SelectField from '../common/form/SelectField'
import RadioField from '../common/form/RadioField'

const RegisterForm = () => {
    const [professions, setProfessions] = useState<ProfessionDTO[]>([])
    const { register, registerControl, get, change: handleChange, submit: handleSubmit } = useForm()

    const requiredText = 'This field is required'
    const genderOptions = useRef([
        { name: 'Male', _id: 'male' },
        { name: 'Female', _id: 'female' },
        { name: 'Other', _id: 'other' }
    ])

    const emailControl = get('email')
    const passwordControl = get('password')
    const professionsControl = get('professions')
    const genderControl = get('gender')

    useEffect(() => {
        api.professions.fetchAll().then((data: any) => setProfessions(data))
    }, [])

    const onSubmit = (data: any) => {
        console.log(data)
    }


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

            <SelectField items={professions}
                label="Professions"
                name="professions"
                ref={register([
                    Validators.required({ message: requiredText })
                ])}
                value={professionsControl?.value}
                error={professionsControl?.errors[0]?.message}
                onChange={handleChange}/>

            <RadioField items={genderOptions.current}
                label="Gender"
                ref={registerControl('gender')}
                instance={genderControl as any}
                name="gender"
                onChange={handleChange}/>

            <button type="submit" className="btn btn-primary w-100 mx-auto">Submit</button>
        </form>
    )
}

export default RegisterForm
