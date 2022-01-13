import { combineReducers, configureStore } from '@reduxjs/toolkit'
import qualityReducer from './qualities'
import professionReducer from './professions'
import usersReducer from './users'
import commentsReducer from './comments'
import { useDispatch } from 'react-redux'

const reducer = combineReducers({
    qualities: qualityReducer,
    professions: professionReducer,
    users: usersReducer,
    comments: commentsReducer
})

export const store = configureStore({
    reducer
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
