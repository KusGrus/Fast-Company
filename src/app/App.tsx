import React from 'react'
import NavBar from './components/ui/NavBar'
import { Route, Switch, Redirect } from 'react-router-dom'
import Main from './layouts/Main'
import Login from './layouts/Login'
import Users from './layouts/Users'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProfessionProvider from './hooks/useProfession'
import QualityProvider from './hooks/useQuality'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/ProtectedRoute'
import Logout from './layouts/Logout'


const App = () => {
    return (
        <React.Fragment>
            <AuthProvider>
                <ProfessionProvider>
                    <QualityProvider>
                        <NavBar/>
                        <Switch>
                            <Route path="/" component={Main} exact/>
                            <Route path="/login/:type?" component={Login}/>
                            <ProtectedRoute path="/users/:id?" component={Users}/>
                            <Route path="/logout" component={Logout}/>
                            <Redirect to='/'/>
                        </Switch>
                    </QualityProvider>
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer />
        </React.Fragment>
    )
}

export default App
