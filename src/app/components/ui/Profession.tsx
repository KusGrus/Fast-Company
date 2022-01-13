import React from 'react'
import { ProfessionProps } from '../types'
import Loader from '../common/loader/Loader'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { getProfessionsById, getProfessionsIsLoading } from '../../store/professions'

const Profession = ({ id }: ProfessionProps) => {
    const isLoading = useTypedSelector(getProfessionsIsLoading)
    const profession = useTypedSelector(getProfessionsById(id))
    return <>{isLoading ? <Loader/> : <p>{profession?.name}</p>}</>
}

export default Profession
