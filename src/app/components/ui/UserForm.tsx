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

    useEffect(() => {
        api.professions.fetchAll().then((p: any) => setProfessions(p))
        api.qualities.fetchAll().then((q: any) => setQualities(utils.convertQualities(q)))
    }, [])

    const onSubmit = (data: any) => onUpdate(data)

    return (
        <h1>12</h1>
    )
}

export default UserForm
