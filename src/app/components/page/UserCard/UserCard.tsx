import React, { useEffect, useState } from 'react'
import api from '../../../../api'
import { UserCardProps } from '../../types'
import { UserDTO } from '../../../../api/fake.api/user.api.model'
import Loader from '../../common/loader/Loader'
import QualitiesList from '../../common/QualitiesList'
import { Link } from 'react-router-dom'

const UserCard = ({ id }: UserCardProps) => {
    const [user, setUser] = useState<UserDTO>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        api.users.getById(id).then(user => {
            setLoading(false)
            if (user) {
                setUser(user as UserDTO)
            }
        })
    }, [])

    if (loading) {
        return <Loader fixed/>
    } else if (user) {
        return (
            <React.Fragment>
                <div className="card" style={{ width: '30rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Rating: {user.rate}</h6>
                        <h6 className="card-subtitle mb-2 text-muted"><QualitiesList qualities={user.qualities}/></h6>
                        <h6 className="card-subtitle mb-2 text-muted">All meetings: {user.completedMeetings}</h6>
                        <p className="card-text">Profession: {user.profession.name}</p>
                        <Link to='/users'><a className="btn btn-primary">Go back</a></Link>
                    </div>
                </div>
            </React.Fragment>
        )
    } else {
        return <h1>User not found!</h1>
    }
}

export default UserCard
