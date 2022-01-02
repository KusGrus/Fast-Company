import React from 'react'
import { Route, useParams } from 'react-router-dom'
import UserList from '../components/page/UserList'
import UserCard, { UserEdit } from '../components/page/UserCard'
import UserProvider from '../hooks/useUser'
import { useAuth } from '../hooks/useAuth'
import RouteGuard from '../components/common/RouteGuard'

const Users = () => {
    const { id } = useParams<{ id: string }>()
    const { user } = useAuth()

    const editGuard = () => user?._id === id

    return (
        <UserProvider>
            <Route path="/users" component={UserList} exact/>
            <RouteGuard path="/users/:id/edit"
                exact
                redirect={{ to: '/users/' + user?._id }}
                guard={editGuard}>
                <UserEdit id={id}/>
            </RouteGuard>
            <Route path="/users/:id" exact render={() => (<UserCard id={id}/>)}/>
        </UserProvider>
    )
}

export default Users
