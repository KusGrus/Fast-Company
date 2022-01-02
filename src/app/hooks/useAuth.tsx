import React, { PropsWithChildren, useContext, useEffect, useState } from 'react'
import {
    ErrorMessageMap,
    FirebaseAuthErrors,
    FirebaseAuthResponse,
    SignInData,
    IUser,
    UseAuthContext
} from './types'
import { toast } from 'react-toastify'
import axios from 'axios'
import userService from '../services/user.service'
import localStorageService from '../services/localStorage.service'
import utils from '../common/utils'
import Loader from '../components/common/loader/Loader'
import { useHistory } from 'react-router-dom'

export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: process.env.REACT_APP_FIREBASE_API_KEY
    }
})

const AuthContext = React.createContext<UseAuthContext | null>(null)

export const useAuth = (): UseAuthContext => {
    return useContext(AuthContext) as UseAuthContext
}

const AuthProvider = ({ children }: PropsWithChildren<any>) => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const history = useHistory()

    useEffect(() => {
        if (error) {
            toast.error(error)
            setError(null)
        }
    }, [error])

    useEffect(() => {
        preloadUser().then()
    }, [])

    const errorCatcher = (e: { response: { data: { message: any } } }) => {
        const { message } = e.response.data
        setError(message)
    }

    const errorHandler = (e: FirebaseAuthErrors) => {
        const { code, message } = e.response.data.error
        if (code === 400) {
            setError(ErrorMessageMap[message])
        }
        const error = { code: message, message: ErrorMessageMap[message] }
        throw (error)
    }

    const createUser = async (data: IUser) => {
        try {
            const { content } = await userService.create(data)
            setCurrentUser(content)
        } catch (e) {
            errorCatcher(e)
        }
    }

    const getUser = async (id: string) => {
        try {
            const { content } = await userService.getById(id)
            setCurrentUser(content)
        } catch (e) {
            errorCatcher(e)
        } finally {
            setIsLoading(false)
        }
    }

    const preloadUser = async () => {
        if (localStorageService.getAccessToken()) {
            await getUser(localStorageService.getLocalId() as string)
        } else {
            setIsLoading(false)
        }
    }

    const signUp = async ({ email, password, ...rest }: IUser) => {
        try {
            const { data }: { data: FirebaseAuthResponse } = await httpAuth.post('accounts:signUp', {
                email,
                password,
                returnSecureToken: true
            })
            localStorageService.setToken(data)
            await createUser({
                ...rest,
                email,
                _id: data.localId,
                completedMeetings: utils.random(0, 100),
                imageSrc: utils.generateAvatar(),
                rate: utils.random(0, 5)
            })
        } catch (e) {
            errorHandler(e)
        }
    }

    const signIn = async ({ email, password }: SignInData) => {
        try {
            const { data }: { data: FirebaseAuthResponse } = await httpAuth.post('accounts:signInWithPassword', {
                email,
                password,
                returnSecureToken: true
            })
            localStorageService.setToken(data)
            await getUser(data.localId)
        } catch (e) {
            errorHandler(e)
        }
    }

    const edit = async (id: string, userInfo: IUser) => {
        try {
            const { content } = await userService.edit(id, { ...currentUser, ...userInfo })
            setCurrentUser(content)
        } catch (e) {
            errorHandler(e)
        }
    }

    const logout = () => {
        localStorageService.reset()
        setCurrentUser(null)
        history.push('/')
    }

    return (
        <AuthContext.Provider value={{ signUp, signIn, logout, edit, user: currentUser }}>
            { !isLoading ? children : <Loader/>}
        </AuthContext.Provider>
    )
}

export default AuthProvider
