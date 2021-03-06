import React, { useEffect } from 'react'
import useForm from '../../hooks/useForm'
import RadioField from '../common/form/RadioField'
import MultiSelectField from '../common/form/MultiSelectField'
import Form from '../common/Form'
import InputField from '../common/form/InputField'
import SelectField from '../common/form/SelectField'
import Validators from '../../common/validators'
import { genderOptions, requiredText, UserEditProps } from '../types'
import { getQualities } from '../../store/qualities'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { getProfessions, getProfessionsById } from '../../store/professions'

const UserForm = ({ user, onUpdate }: UserEditProps) => {
    const professions = useTypedSelector(getProfessions)
    const userProfessions = useTypedSelector(getProfessionsById(user.profession))
    const qualities = useTypedSelector(getQualities)

    const { state, submit, patchValue } = useForm({
        name: ['', [Validators.required({ message: requiredText })]],
        email: ['', [
            Validators.required({ message: requiredText }),
            Validators.email({ message: 'Incorrect e-mail!' })
        ]],
        profession: [{}, [Validators.required({ message: requiredText })]],
        sex: [''],
        qualities: [[]]
    })

    useEffect(() => {
        patchValue({
            name: user.name,
            email: user.email,
            profession: userProfessions,
            sex: user.sex,
            qualities: qualities?.filter(q => user.qualities.includes(q._id))
        })
    }, [professions, qualities])

    const onSubmit = (data: any) => onUpdate(data)

    return (
        <Form title="Edit user">
            <form onSubmit={submit(onSubmit)}>
                <InputField label="Name"
                    error={state.name.errors[0]?.message}
                    value={state.name.value}
                    onChange={state.name.patchValue}/>

                <InputField label="Email"
                    error={state.email.errors[0]?.message}
                    value={state.email.value}
                    onChange={state.email.patchValue}/>

                <SelectField label="Profession"
                    items={professions}
                    value={state.profession.value}
                    error={state.profession.errors[0]?.message}
                    onChange={state.profession.patchValue}/>

                <RadioField label="Gender"
                    items={genderOptions}
                    name="sex"
                    value={state.sex.value}
                    onChange={state.sex.patchValue}/>

                <MultiSelectField items={qualities}
                    label="Qualities"
                    values={state.qualities.value}
                    onChange={state.qualities.patchValue}/>

                <button type="submit" className="btn btn-primary w-100 mx-auto">Update</button>
            </form>
        </Form>
    )
}

export default UserForm
