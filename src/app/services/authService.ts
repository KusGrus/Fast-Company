import axios from 'axios'
import { FirebaseAuthResponse, IUser, SignInData } from '../hooks/types'
import { AuthService } from './types'
import userService from './user.service'

const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: process.env.REACT_APP_FIREBASE_API_KEY
    }
})

const authService: AuthService = {
    signUp: async ({ email, password }: IUser) => {
        const { data }: { data: FirebaseAuthResponse } = await httpAuth.post('accounts:signUp', {
            email,
            password,
            returnSecureToken: true
        })
        return data
    },
    signIn: async({ email, password }: SignInData) => {
        const { data }: { data: FirebaseAuthResponse } = await httpAuth.post('accounts:signInWithPassword', {
            email,
            password,
            returnSecureToken: true
        })
        return data
    },
    edit: async (id: string, user: IUser) => {
        const { content } = await userService.edit(id, user)
        return content
    }
}

export default authService
