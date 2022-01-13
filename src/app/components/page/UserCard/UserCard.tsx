import React from 'react'
import { UserCardProps } from '../../types'
import UserProfile from '../../ui/UserProfile'
import Comments from '../../ui/Comments'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { getUserById } from '../../../store/users'

const UserCard = ({ id }: UserCardProps) => {
    const user = useTypedSelector(getUserById(id))

    if (user) {
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
