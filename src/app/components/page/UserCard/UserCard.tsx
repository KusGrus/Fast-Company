import React from 'react'
import { UserCardProps } from '../../types'
import UserProfile from '../../ui/UserProfile'
import Comments from '../../ui/Comments'
import { useUser } from '../../../hooks/useUser'
import CommentsProvider from '../../../hooks/useComments'

const UserCard = ({ id }: UserCardProps) => {
    const { getUserById } = useUser()
    const user = getUserById(id)

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <UserProfile user={user}/>
                    <CommentsProvider>
                        <Comments/>
                    </CommentsProvider>
                </div>
            </div>
        )
    } else {
        return <h1>User not found!</h1>
    }
}

export default UserCard
