import React from 'react'
import { Route, useParams } from 'react-router-dom'
import UserList from '../components/page/UserList'
import UserCard, { UserEdit } from '../components/page/UserCard'

const Users = () => {
    const { id } = useParams<{id: string}>()
    return (
        <React.Fragment>
            <Route path="/users" component={UserList} exact/>
            <Route path="/users/:id/edit" exact render={() => (<UserEdit id={id}/>)}/>
            <Route path="/users/:id" exact render={() => (<UserCard id={id}/>)}/>
        </React.Fragment>
    )
}

export default Users
