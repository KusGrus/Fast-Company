import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from './store'
import userService from '../services/user.service'
import authService from '../services/authService'
import localStorageService from '../services/localStorage.service'
import { ErrorMessageMap, FirebaseAuthErrors, IUser, SignInData } from '../hooks/types'
import utils from '../common/utils'
import history from '../common/history'

interface UsersState {
    entities: IUser[]
    isLoading: boolean
    error: { code: number, message: string } | null
    auth: {
        isLoggedIn: boolean
        userId: string | null
    }
}

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        entities: [],
        isLoading: true,
        error: null,
        auth: {
            isLoggedIn: !!localStorageService.getLocalId(),
            userId: localStorageService.getLocalId()
        }
    } as UsersState,
    reducers: {
        requested: state => {
            state.isLoading = true
        },
        received: (state, { payload }: PayloadAction<IUser[]>) => {
            state.entities = payload
            state.isLoading = false
        },
        fail: (state, { payload }: PayloadAction<{ code: number, message: string }>) => {
            state.error = payload
            state.isLoading = false
        },
        authSuccess: (state, { payload }: PayloadAction<{ userId: string }>) => {
            state.auth = { ...payload, isLoggedIn: true }
        },
        authFail: (state, { payload }: PayloadAction<{ code: number, message: string }>) => {
            state.error = payload
        },
        create: (state, { payload }: PayloadAction<IUser>) => {
            state.entities.push(payload)
        },
        createFail: (state, { payload }: PayloadAction<{ code: number, message: string }>) => {
            state.error = payload
        },
        logout: (state) => {
            state.entities = []
            state.auth.userId = null
            state.auth.isLoggedIn = false
        },
        editUser: (state, { payload }: PayloadAction<IUser>) => {
            const candidateIdx = state.entities.findIndex(u => u._id === payload._id)
            if (candidateIdx >= 0) {
                state.entities[candidateIdx] = payload
            }
        }
    }
})

export const { reducer, actions } = usersSlice
const { received, requested, fail, authSuccess, authFail, create, createFail, logout, editUser } = actions
const authRequested = createAction('user/authRequested')
const userCreateRequested = createAction('user/userCreateRequested')

export const loadUsersList = () => async (dispatch: AppDispatch) => {
    dispatch(requested())
    try {
        const { content } = await userService.get()
        dispatch(received(content))
    } catch (e) {
        dispatch(fail(e.message))
    }
}

const createUser = (data: IUser) => async (dispatch: AppDispatch) => {
    dispatch(userCreateRequested())
    try {
        const { content } = await userService.create(data)
        dispatch(create(content))
        history.push('/users')
    } catch (e) {
        dispatch(createFail(e.message))
    }
}

const errorHandler = (error: FirebaseAuthErrors, dispatch: AppDispatch) => {
    const { code, message } = error.response.data.error
    if (code === 400) {
        dispatch(authFail({ code, message: ErrorMessageMap[message] }))
    } else {
        dispatch(authFail({ code, message }))
    }
}

export const signIn = ({
    payload,
    redirect
}: { payload: SignInData, redirect: string }) => async (dispatch: AppDispatch) => {
    dispatch(authRequested())
    try {
        const data = await authService.signIn(payload)
        localStorageService.setToken(data)
        dispatch(authSuccess({ userId: data.localId }))
        history.push(redirect)
    } catch (e) {
        errorHandler(e, dispatch)
    }
}

export const signUp = ({ email, password, ...rest }: IUser) => async (dispatch: AppDispatch) => {
    dispatch(authRequested())
    try {
        const data = await authService.signUp({ email, password, ...rest })
        localStorageService.setToken(data)
        dispatch(authSuccess({ userId: data.localId }))
        dispatch(createUser({
            ...rest,
            email,
            _id: data.localId,
            completedMeetings: utils.random(0, 100),
            imageSrc: utils.generateAvatar(),
            rate: utils.random(0, 5)
        }))
    } catch (e) {
        errorHandler(e, dispatch)
    }
}

export const edit = (id: string, user: IUser) => async (dispatch: AppDispatch) => {
    dispatch(authRequested())
    try {
        const data = await authService.edit(id, user)
        dispatch(editUser(data))
        history.push('/users/' + id)
    } catch (e) {
        errorHandler(e, dispatch)
    }
}

export const logOut = () => (dispatch: AppDispatch) => {
    localStorageService.reset()
    dispatch(logout())
    history.push('/')
}

export const getUsers = (state: RootState) => state.users.entities
export const getIsLoggedIn = (state: RootState) => state.users.auth.isLoggedIn
export const getAuthError = (state: RootState) => state.users.error
export const getCurrentUserId = (state: RootState) => state.users.auth.userId as string
export const getCurrentUserData = (state: RootState) => state.users.entities?.find(u => u._id === state.users.auth.userId)
export const getUserById = (id: string) => (state: RootState) => state.users.entities?.find(u => u._id === id) as IUser

export default reducer
