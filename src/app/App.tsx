import React, { useEffect } from 'react'
import NavBar from './components/ui/NavBar'
import { Redirect, Route, Switch } from 'react-router-dom'
import Main from './layouts/Main'
import Login from './layouts/Login'
import Users from './layouts/Users'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/ProtectedRoute'
import Logout from './layouts/Logout'
import { loadQualitiesList } from './store/qualities'
import { useAppDispatch } from './store/store'
import { loadProfessionsList } from './store/professions'
import { getAuthError, loadUsersList } from './store/users'
import { useTypedSelector } from './hooks/useTypedSelector'

const App = () => {
    const dispatch = useAppDispatch()
    const authError = useTypedSelector(getAuthError)

    useEffect(() => {
        dispatch(loadQualitiesList())
        dispatch(loadProfessionsList())
        dispatch(loadUsersList())
    }, [])

    useEffect(() => {
        toast.error(authError?.message)
    }, [authError])

    return (
        <React.Fragment>
            <AuthProvider>
                <NavBar/>
                <Switch>
                    <Route path="/" component={Main} exact/>
                    <Route path="/login/:type?" component={Login}/>
                    <ProtectedRoute path="/users/:id?" component={Users}/>
                    <Route path="/logout" component={Logout}/>
                    <Redirect to="/"/>
                </Switch>
            </AuthProvider>
            <ToastContainer/>
        </React.Fragment>
    )
}

export default App
