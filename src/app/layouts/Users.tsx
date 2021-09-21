import React from 'react'
import FastCompany from '../components/FastCompany'
import { Route, useParams } from 'react-router-dom'
import UserCard from '../components/UserCard'

const Users = () => {
    const { id } = useParams<{id: string}>()
    return (
        <React.Fragment>
            <Route path="/users" component={FastCompany} exact/>
            <Route path="/users/:id" render={() => (<UserCard id={id}/>)}/>
        </React.Fragment>
    )
}

export default Users
