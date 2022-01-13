import React from 'react'
import { UserCardProps } from '../../types'
import UserForm from '../../ui/UserForm'
import { useHistory } from 'react-router-dom'
import { UserDTO } from '../../../../api/fake.api/api.model'
import { IUser } from '../../../hooks/types'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { edit, getCurrentUserData } from '../../../store/users'
import { useAppDispatch } from '../../../store/store'

const UserEdit = ({ id }: UserCardProps) => {
    const history = useHistory()
    const dispatch = useAppDispatch()
    const user = useTypedSelector(getCurrentUserData)

    const handleBack = () => history.goBack()

    const handleUpdate = (data: UserDTO) => {
        const formData: IUser = {
            ...data,
            qualities: data.qualities.map(q => q._id),
            profession: data.profession._id
        }
        dispatch(edit(id, { ...user, ...formData }))
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
