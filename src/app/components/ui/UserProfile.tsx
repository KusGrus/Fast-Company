import React from 'react'
import Card from '../common/Card'
import { UserProfileProps } from '../types'
import { QualityDTO } from '../../../api/fake.api/api.model'
import { useHistory } from 'react-router-dom'
import RandomAvatar from '../common/RandomAvatar'
import { useProfession } from '../../hooks/useProfession'
import { useQuality } from '../../hooks/useQuality'
import { IUser } from '../../hooks/types'
import { useAuth } from '../../hooks/useAuth'

const UserProfile = ({
    user: {
        imageSrc,
        name,
        profession: profId,
        rate,
        completedMeetings,
        qualities: qualitiesIds,
        _id: id
    }
}: UserProfileProps) => {
    const history = useHistory()
    const { user } = useAuth()
    const { getProfessionById } = useProfession()
    const { qualities } = useQuality()

    const profession = getProfessionById(profId)
    const userQualities = qualities.filter(q => qualitiesIds?.includes(q._id))

    const generateQuality = (quality: QualityDTO) => {
        const classes = `badge bg-${quality.color}`
        return <span className={classes} key={quality._id} style={{ margin: '5px' }}>{quality.name}</span>
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
                    {id === user?._id && (
                        <button className="position-absolute top-0 end-0 btn btn-light btn-sm"
                            onClick={() => navigate('edit', true)}>
                            <i className="bi bi-gear"/>
                        </button>
                    )}
                    <div className="d-flex flex-column align-items-center text-center position-relative">
                        <RandomAvatar src={imageSrc}/>
                        <div className="mt-3">
                            <h4>{name}</h4>
                            <p className="text-secondary mb-1">{profession?.name}</p>
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
                    <p className="card-text">{userQualities.map(generateQuality)}</p>
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
