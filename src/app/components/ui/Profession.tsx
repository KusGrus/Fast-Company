import React from 'react'
import { ProfessionProps } from '../types'
import { useProfession } from '../../hooks/useProfession'
import Loader from '../common/loader/Loader'

const Profession = ({ id }: ProfessionProps) => {
    const { getProfessionById, isLoading } = useProfession()
    const profession = getProfessionById(id)
    return <>{isLoading ? <Loader/> : <p>{profession?.name}</p>}</>
}

export default Profession
