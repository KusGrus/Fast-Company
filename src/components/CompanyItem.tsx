import React, {ReactNode} from 'react'
import {FastListProps} from "./types"
import {QualityDTO} from "../api/fake.api/user.api.model";

export class CompanyItem extends React.Component<FastListProps, any> {

    private getQualityClasses(quality: QualityDTO): string {
        return `badge bg-${quality.color} mr-5`
    }

    render(): ReactNode {
        const user = this.props.user
        return (
            <React.Fragment>
                <tr>
                    <th scope="col">{user.name}</th>
                    <th scope="col">{user.qualities.map(quality =>
                        <span key={quality._id} className={this.getQualityClasses(quality)}>{quality.name}</span>)}
                    </th>
                    <th scope="col">{user.profession.name}</th>
                    <th scope="col">{user.completedMeetings}</th>
                    <th scope="col">{user.rate}</th>
                    <th scope="col">
                        <button onClick={() => this.props.onDelete(user._id)} type="button"
                                className="btn btn-danger">Delete
                        </button>
                    </th>
                </tr>
            </React.Fragment>
        )
    }
}
