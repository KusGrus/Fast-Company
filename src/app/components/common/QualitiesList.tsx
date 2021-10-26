import React from 'react'
import { QualitiesListProps } from '../types'
import { QualityDTO } from '../../../api/fake.api/api.model'

const QualitiesList = ({ qualities }: QualitiesListProps) => {
    const getQualityClasses = (quality: QualityDTO) => `badge bg-${quality.color} mr-5`
    return (
        <React.Fragment>
            {qualities.map((quality) => (
                <span key={quality._id} className={getQualityClasses(quality)}>
                    {quality.name}
                </span>
            ))}
        </React.Fragment>
    )
}

export default QualitiesList
