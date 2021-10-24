import React from 'react'
import Card from '../common/Card'
import { UserProfileProps } from '../types'
import { QualityDTO } from '../../../api/fake.api/user.api.model'
import { useHistory } from 'react-router-dom'

const UserProfile = ({ user: { name, profession, rate, qualities, completedMeetings } }: UserProfileProps) => {
    const history = useHistory()

    const generateQuality = (quality: QualityDTO) => {
        const classes = `badge bg-${quality.color}`
        return <span className={classes} style={{ margin: '5px' }}>{quality.name}</span>
    }

    const navigate = (url: string, relative = false) => {
        const path = relative ? `${window.location.pathname}/${url}` : `${url}`
        history.push(path)
    }

    return (
        <React.Fragment>
            <div className="mb-3">
                <button type="submit" className="btn btn-primary" onClick={() => navigate('/users')}>
                    Back
                </button>
            </div>
            <div className="col-md-4 mb-3">
                <Card>
                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={() => navigate('edit', true)}>
                        <i className="bi bi-gear" />
                    </button>
                    <div className="d-flex flex-column align-items-center text-center position-relative">
                        <img src="https://avatars.dicebear.com/api/avataaars/qweqwdas.svg"
                            className="rounded-circle" width="150" alt="Avatar"/>
                        <div className="mt-3">
                            <h4>{name}</h4>
                            <p className="text-secondary mb-1">{profession.name}</p>
                            <div className="text-muted">
                                <i className="bi bi-caret-down-fill text-primary" role="button"/>
                                <i className="bi bi-caret-up text-secondary" role="button"/>
                                <span className="ms-2">{rate}</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <h5 className="card-title"><span>Qualities</span></h5>
                    <p className="card-text">{qualities.map(generateQuality)}</p>
                </Card>

                <Card>
                    <h5 className="card-title"><span>Completed meetings</span></h5>
                    <h1 className="display-1">{completedMeetings}</h1>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default UserProfile
