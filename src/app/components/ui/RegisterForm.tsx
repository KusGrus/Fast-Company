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
import { genderOptions, LoginFormData, requiredText } from '../types'
import { IUser } from '../../hooks/types'
import { useAppDispatch } from '../../store/store'
import { signUp } from '../../store/users'

const RegisterForm = () => {
    const dispatch = useAppDispatch()
    const [professions, setProfessions] = useState<ProfessionDTO[]>([])
    const [qualities, setQualities] = useState<ObjectDTO[]>([])

    const { state, submit } = useForm({
        name: ['', [
            Validators.required({ message: requiredText }),
            Validators.min(3, { message: 'Minimum of 8 characters!' })
        ]],
        email: ['', [
            Validators.required({ message: requiredText }),
            Validators.email({ message: 'Incorrect e-mail!' })
        ]],
        password: ['', [
            Validators.required({ message: requiredText }),
            Validators.min(8, { message: 'Minimum of 8 characters!' })
        ]],
        profession: ['', [Validators.required({ message: requiredText })]],
        sex: ['male'],
        qualities: [null],
        licence: [false, [Validators.required({ message: requiredText })]]
    })

    useEffect(() => {
        api.professions.fetchAll().then((p: any) => setProfessions(p))
        api.qualities.fetchAll().then((q: any) => setQualities(utils.convertQualities(q)))
    }, [])

    const onSubmit = (data: LoginFormData) => {
        const formData: IUser = {
            ...data,
            profession: data.profession._id,
            qualities: data.qualities.map(q => q._id)
        }
        dispatch(signUp(formData))
    }

    return (
        <form onSubmit={submit(onSubmit)}>
            <InputField label="Email"
                error={state.email.errors[0]?.message}
                value={state.email?.value}
                onChange={state.email.patchValue}/>

            <InputField label="Name"
                error={state.name.errors[0]?.message}
                value={state.name?.value}
                onChange={state.name.patchValue}/>

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
