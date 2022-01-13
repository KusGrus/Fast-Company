import React, { useEffect } from 'react'
import { Route, useParams } from 'react-router-dom'
import UserList from '../components/page/UserList'
import UserCard, { UserEdit } from '../components/page/UserCard'
import RouteGuard from '../components/common/RouteGuard'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { getCurrentUserId, getUsers, loadUsersList } from '../store/users'
import { useAppDispatch } from '../store/store'

const Users = () => {
    const { id } = useParams<{ id: string }>()
    const userId = useTypedSelector(getCurrentUserId)
    const users = useTypedSelector(getUsers)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!users.length) {
            dispatch(loadUsersList())
        }
    }, [])

    const editGuard = () => userId === id

    return (
        <>
            <Route path="/users" component={UserList} exact/>
            <RouteGuard path="/users/:id/edit"
                exact
                redirect={{ to: '/users/' + userId }}
                guard={editGuard}>
                <UserEdit id={id}/>
            </RouteGuard>
            <Route path="/users/:id" exact render={() => (<UserCard id={id}/>)}/>
        </>
    )
}

export default Users
