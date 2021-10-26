import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm'
import RadioField from '../common/form/RadioField'
import MultiSelectField from '../common/form/MultiSelectField'
import Form from '../common/Form'
import api from '../../../api'
import InputField from '../common/form/InputField'
import SelectField from '../common/form/SelectField'
import Validators from '../../common/validators'
import utils from '../../common/utils'
import { genderOptions, requiredText, UserEditProps } from '../types'
import { ObjectDTO, ProfessionDTO } from '../../../api/fake.api/api.model'

const UserForm = ({ user, onUpdate }: UserEditProps) => {
    const [professions, setProfessions] = useState<ProfessionDTO[]>([])
    const [qualities, setQualities] = useState<ObjectDTO[]>([])

    const { state, submit } = useForm({
        name: [user.name, [Validators.required({ message: requiredText })]],
        email: [user.email, [
            Validators.required({ message: requiredText }),
            Validators.email({ message: 'Incorrect e-mail!' })
        ]],
        profession: [user.profession, [Validators.required({ message: requiredText })]],
        sex: [user.sex],
        qualities: [user.qualities]
    })

    useEffect(() => {
        api.professions.fetchAll().then((p: any) => setProfessions(p))
        api.qualities.fetchAll().then((q: any) => setQualities(utils.convertQualities(q)))
    }, [])

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
