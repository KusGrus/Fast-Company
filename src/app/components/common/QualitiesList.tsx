import React from 'react'
import { QualitiesListProps } from '../types'
import { QualityDTO } from '../../../api/fake.api/api.model'
import { getQualities } from '../../store/qualities'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const QualitiesList = ({ qualities: userQualities }: QualitiesListProps) => {
    const qualities = useTypedSelector(getQualities)
    const qualitiesPull = qualities?.filter(q => userQualities.includes(q._id))
    const getQualityClasses = (quality: QualityDTO) => `badge bg-${quality.color} mr-5`
    return (
        <React.Fragment>
            {qualitiesPull.map((quality) => (
                <span key={quality._id} className={getQualityClasses(quality)}>{quality.name}</span>
            ))}
        </React.Fragment>
    )
}

export default QualitiesList
