import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm'
import InputField from '../common/form/InputField'
import Validators from '../../common/validators'
import api from '../../../api'
import { ObjectDTO, ProfessionDTO } from '../../../api/fake.api/api.model'
import utils from '../../common/utils'
import SelectField from '../common/form/SelectField'
import RadioField from '../common/form/RadioField'
import MultiSelectField from '../common/form/MultiSelectField'
import CheckboxField from '../common/form/CheckboxField'
import { genderOptions, requiredText } from '../types'

const RegisterForm = () => {
    const [professions, setProfessions] = useState<ProfessionDTO[]>([])
    const [qualities, setQualities] = useState<ObjectDTO[]>([])
    const { register, get, change: handleChange, submit: handleSubmit } = useForm()

    const emailControl = get('email')
    const passwordControl = get('password')
    const professionsControl = get('professions')
    const qualitiesControl = get('qualities')
    const licenceControl = get('licence')

    useEffect(() => {
        api.professions.fetchAll().then((p: any) => setProfessions(p))
        api.qualities.fetchAll().then((q: any) => setQualities(utils.convertQualities(q)))
    }, [])

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField ref={register(null, [
                Validators.required({ message: requiredText }),
                Validators.email({ message: 'Incorrect e-mail!' })
            ])}
            label="Email"
            name="email"
            error={emailControl?.errors[0]?.message}
            value={emailControl?.value}
            onChange={handleChange}/>

            <InputField ref={register(null, [
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
                ref={register(null, [
                    Validators.required({ message: requiredText })
                ])}
                value={professionsControl?.value}
                error={professionsControl?.errors[0]?.message}
                onChange={handleChange}/>

            <RadioField items={genderOptions}
                label="Gender"
                registry={register(null)}
                name="gender"
                onChange={handleChange}/>

            <MultiSelectField items={qualities}
                label="Qualities"
                name="qualities"
                registry={register([])}
                values={qualitiesControl?.value}
                onChange={handleChange}/>

            <CheckboxField label="Accept the license agreement"
                ref={register(null, [
                    Validators.required({ message: 'You must accept the terms of the license agreement' })
                ])}
                name="licence"
                error={licenceControl?.errors[0]?.message}
                onChange={handleChange}/>

            <button type="submit" className="btn btn-primary w-100 mx-auto">Submit</button>
        </form>
    )
}

export default RegisterForm
