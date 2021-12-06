import React, { PropsWithChildren, useContext, useEffect, useState } from 'react'
import {
    ErrorMessageMap,
    FirebaseAuthErrors,
    FirebaseAuthResponse,
    SignInData,
    SignUpData,
    UseAuthContext
} from './types'
import { toast } from 'react-toastify'
import axios from 'axios'
import userService from '../services/user.service'
import localStorageService from '../services/localStorage.service'

const httpAuth = axios.create()

const AuthContext = React.createContext<UseAuthContext | null>(null)

export const useAuth = (): UseAuthContext => {
    return useContext(AuthContext) as UseAuthContext
}

const AuthProvider = ({ children }: PropsWithChildren<any>) => {
    const [currentUser, setCurrentUser] = useState<SignUpData>()
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (error) {
            toast.error(error)
            setError(null)
        }
    }, [error])

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

    const createUser = async (data: SignUpData) => {
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
        }
    }

    const signUp = async ({ email, password, ...rest }: SignUpData) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
        try {
            const { data }: {data: FirebaseAuthResponse} = await httpAuth.post(url, { email, password, returnSecureToken: true })
            localStorageService.setToken(data)
            await createUser({ ...rest, email, _id: data.localId })
        } catch (e) {
            errorHandler(e)
        }
    }

    const signIn = async ({ email, password }: SignInData) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
        try {
            const { data }: {data: FirebaseAuthResponse} = await httpAuth.post(url, { email, password, returnSecureToken: true })
            localStorageService.setToken(data)
            await getUser(data.localId)
        } catch (e) {
            errorHandler(e)
        }
    }

    return (
        <AuthContext.Provider value={{ signUp, signIn, user: currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
