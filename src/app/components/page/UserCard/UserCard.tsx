import React, { useEffect, useState } from 'react'
import api from '../../../../api'
import { UserCardProps } from '../../types'
import { UserDTO } from '../../../../api/fake.api/api.model'
import Loader from '../../common/loader/Loader'
import UserProfile from '../../ui/UserProfile'
import Comments from './Comments'

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
            <div className="container">
                <div className="row gutters-sm">
                    <UserProfile user={user}/>
                    <Comments/>
                </div>
            </div>
        )
    } else {
        return <h1>User not found!</h1>
    }
}

export default UserCard
