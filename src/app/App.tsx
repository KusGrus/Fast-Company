import React from 'react'
import NavBar from './components/ui/NavBar'
import { Route } from 'react-router-dom'
import Main from './layouts/Main'
import Login from './layouts/Login'
import Users from './layouts/Users'
import { ToastContainer } from 'react-toastify'
import ProfessionProvider from './hooks/useProfession'
import QualityProvider from './hooks/useQuality'


const App = () => {
    return (
        <React.Fragment>
            <NavBar/>
            <Route path="/" component={Main} exact/>
            <ProfessionProvider>
                <QualityProvider>
                    <Route path="/login/:type?" component={Login}/>
                    <Route path="/users/:id?" component={Users}/>
                </QualityProvider>
            </ProfessionProvider>
            <ToastContainer/>
        </React.Fragment>
    )
}

export default App
