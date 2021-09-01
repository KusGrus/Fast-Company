import React from 'react'
import { FastListProps } from './types'
import { QualityDTO } from '../api/fake.api/user.api.model'
import Bookmark from './Bookmark'

const CompanyItem = ({ user, onDelete, onMark }: FastListProps) => {
    const getQualityClasses = (quality: QualityDTO) =>
        `badge bg-${quality.color} mr-5`
    return (
        <React.Fragment>
            <tr>
                <th scope="col">{user.name}</th>
                <th scope="col">
                    {user.qualities.map((quality) => (
                        <span key={quality._id} className={getQualityClasses(quality)}>
                            {quality.name}
                        </span>
                    ))}
                </th>
                <th scope="col">{user.profession.name}</th>
                <th scope="col">{user.completedMeetings}</th>
                <th scope="col">
                    <Bookmark onMark={onMark} user={user} />
                </th>
                <th scope="col">{user.rate}</th>
                <th scope="col">
                    <button
                        onClick={() => onDelete(user._id)}
                        type="button"
                        className="btn btn-danger"
                    >
            Delete
                    </button>
                </th>
            </tr>
        </React.Fragment>
    )
}

export default CompanyItem
