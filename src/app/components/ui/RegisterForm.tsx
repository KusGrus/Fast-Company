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

    useEffect(() => {
        api.professions.fetchAll().then((p: any) => setProfessions(p))
        api.qualities.fetchAll().then((q: any) => setQualities(utils.convertQualities(q)))
    }, [])

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <h1>re</h1>
    )
}

export default RegisterForm
