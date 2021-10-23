import React from 'react'
import NavBar from './components/ui/NavBar'
import { Route } from 'react-router-dom'
import Main from './layouts/Main'
import Login from './layouts/Login'
import Users from './layouts/Users'

const App = () => {
    return (
        <React.Fragment>
            <NavBar/>
            <Route path="/" component={Main} exact/>
            <Route path="/login/:type?" component={Login}/>
            <Route path="/users/:id?" component={Users}/>
        </React.Fragment>
    )
}

export default App
