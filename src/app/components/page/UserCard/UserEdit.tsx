import React, { useEffect, useState } from 'react'
import { UserCardProps } from '../../types'
import UserForm from '../../ui/UserForm'
import { UserDTO } from '../../../../api/fake.api/user.api.model'
import api from '../../../../api'
import { useHistory } from 'react-router-dom'

const UserEdit = ({ id } :UserCardProps) => {
    const [user, setUser] = useState<UserDTO>()
    const history = useHistory()

    useEffect(() => {
        api.users.getById(id).then(user => setUser(user as UserDTO))
    }, [])

    const handleBack = () => history.goBack()

    const handleUpdate = (data: any) => {
        api.users.update(id, data).then(() => history.push(`/users/${id}`))
    }

    return (
        <div className="container">
            <div className="mb-3">
                <button type="submit" className="btn btn-primary" onClick={handleBack}>
                    Back
                </button>
            </div>
            {user && <UserForm user={user} onUpdate={handleUpdate}/>}
        </div>
    )
}

export default UserEdit
