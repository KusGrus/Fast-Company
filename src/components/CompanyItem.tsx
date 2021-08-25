import React from 'react'
import {FastListProps} from "./types"
import {QualityDTO} from "../api/fake.api/user.api.model";

const CompanyItem = (props: FastListProps) => {
    const getQualityClasses = (quality: QualityDTO) => `badge bg-${quality.color} mr-5`
    const user = props.user
    return (
        <React.Fragment>
            <tr>
                <th scope="col">{user.name}</th>
                <th scope="col">{user.qualities.map(quality =>
                    <span key={quality._id} className={getQualityClasses(quality)}>{quality.name}</span>)}
                </th>
                <th scope="col">{user.profession.name}</th>
                <th scope="col">{user.completedMeetings}</th>
                <th scope="col">{user.rate}</th>
                <th scope="col">
                    <button onClick={() => props.onDelete(user._id)} type="button"
                            className="btn btn-danger">Delete
                    </button>
                </th>
            </tr>
        </React.Fragment>
    )
}

export default CompanyItem
