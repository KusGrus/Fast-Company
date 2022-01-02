import React from 'react'
import { UserCardProps } from '../../types'
import UserForm from '../../ui/UserForm'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { UserDTO } from '../../../../api/fake.api/api.model'
import { IUser } from '../../../hooks/types'

const UserEdit = ({ id }: UserCardProps) => {
    const history = useHistory()
    const { user, edit } = useAuth()

    const handleBack = () => history.goBack()

    const handleUpdate = async (data: UserDTO) => {
        const formData: IUser = {
            ...data,
            qualities: data.qualities.map(q => q._id),
            profession: data.profession._id
        }
        await edit(id, formData)
        history.push('/users/' + id)
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
