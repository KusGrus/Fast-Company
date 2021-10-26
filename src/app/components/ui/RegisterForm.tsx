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

    const { state, submit } = useForm({
        email: ['', [
            Validators.required({ message: requiredText }),
            Validators.email({ message: 'Incorrect e-mail!' })
        ]],
        password: ['', [
            Validators.required({ message: requiredText }),
            Validators.min(8, { message: 'Minimum of 8 characters!' })
        ]],
        profession: ['', [Validators.required({ message: requiredText })]],
        sex: [null],
        qualities: [null],
        licence: [false, [Validators.required({ message: requiredText })]]
    })

    useEffect(() => {
        api.professions.fetchAll().then((p: any) => setProfessions(p))
        api.qualities.fetchAll().then((q: any) => setQualities(utils.convertQualities(q)))
    }, [])

    const onSubmit = (data: any) => console.log(data)

    return (
        <form onSubmit={submit(onSubmit)}>
            <InputField label="Email"
                error={state.email.errors[0]?.message}
                value={state.email?.value}
                onChange={state.email.patchValue}/>

            <InputField label="Password"
                type="password"
                error={state.password.errors[0]?.message}
                value={state.password.value}
                onChange={state.password.patchValue}/>

            <SelectField items={professions}
                label="Profession"
                value={state.profession.value}
                error={state.profession.errors[0]?.message}
                onChange={state.profession.patchValue}/>

            <RadioField items={genderOptions}
                label="Gender"
                name="sex"
                onChange={state.sex.patchValue}/>

            <MultiSelectField label="Qualities"
                items={qualities}
                values={state.qualities.value}
                onChange={state.qualities.patchValue}/>

            <CheckboxField label="Accept the license agreement"
                name="licence"
                error={state.licence.errors[0]?.message}
                onChange={state.licence.patchValue}/>

            <button type="submit" className="btn btn-primary w-100 mx-auto">Submit</button>
        </form>
    )
}

export default RegisterForm
