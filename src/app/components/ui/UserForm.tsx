import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm'
import RadioField from '../common/form/RadioField'
import MultiSelectField from '../common/form/MultiSelectField'
import Form from '../common/Form'
import api from '../../../api'
import TextField from '../common/form/TextField'
import SelectField from '../common/form/SelectField'
import Validators from '../../common/validators'
import utils from '../../common/utils'
import { Gender, genderOptions, UserEditProps } from '../types'
import { ObjectDTO, ProfessionDTO } from '../../../api/fake.api/user.api.model'

const UserForm = ({ user, onUpdate }: UserEditProps) => {
    const [professions, setProfessions] = useState<ProfessionDTO[]>([])
    const [qualities, setQualities] = useState<ObjectDTO[]>([])
    const gender: Gender[] = genderOptions
    const requiredText = 'This field is required'
    const { register, get, change: handleChange, submit: handleSubmit } = useForm()

    const nameControl = get('name')
    const emailControl = get('email')
    const professionControl = get('profession')
    const sexControl = get('sex')
    const qualitiesControl = get('qualities')

    useEffect(() => {
        api.professions.fetchAll().then((p: any) => setProfessions(p))
        api.qualities.fetchAll().then((q: any) => setQualities(utils.convertQualities(q)))
    }, [])

    const onSubmit = (data: any) => onUpdate(data)

    return (
        <Form title="Edit user">
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField label="Name"
                    ref={register(user.name, [Validators.required({ message: requiredText })])}
                    name="name"
                    error={nameControl?.errors[0]?.message}
                    value={nameControl?.value}
                    onChange={handleChange}/>

                <TextField label="Email"
                    ref={register(user.email, [
                        Validators.required({ message: requiredText }),
                        Validators.email({ message: 'Incorrect e-mail!' })])}
                    name="email"
                    error={emailControl?.errors[0]?.message}
                    value={emailControl?.value}
                    onChange={handleChange}/>


                <SelectField label="Profession"
                    items={professions}
                    name="profession"
                    ref={register(user.profession, [Validators.required({ message: requiredText })])}
                    value={professionControl?.value}
                    error={professionControl?.errors[0]?.message}
                    onChange={handleChange}/>

                <RadioField label="Gender"
                    items={gender}
                    registry={register(user.sex)}
                    name="sex"
                    value={sexControl?.value}
                    onChange={handleChange}/>

                <MultiSelectField items={qualities}
                    label="Qualities"
                    name="qualities"
                    registry={register(user.qualities)}
                    values={qualitiesControl?.value}
                    onChange={handleChange}/>

                <button type="submit" className="btn btn-primary w-100 mx-auto">Update</button>
            </form>
        </Form>
    )
}

export default UserForm
