import React, { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { IUser, UseUserContext } from './types'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import Loader from '../components/common/loader/Loader'


const UserContext = React.createContext<UseUserContext | null>(null)

export const useUser = (): UseUserContext => {
    return useContext(UserContext) as UseUserContext
}

const UserProvider = ({ children }: PropsWithChildren<any>) => {
    const [users, setUsers] = useState<IUser[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const errorCatcher = (e: { response: { data: { message: any } } }) => {
        const { message } = e.response.data
        setError(message)
        setLoading(false)
    }

    const getUsers = async () => {
        try {
            const { content } = await userService.get()
            setUsers(content)
            setLoading(false)
        } catch (e) {
            errorCatcher(e)
        }
    }

    const getUserById = (id: string) => {
        return users.find(u => u._id === id)
    }

    useEffect(() => {
        getUsers().then()
    }, [])

    useEffect(() => {
        if (error) {
            toast.error(error)
            setError(null)
        }
    }, [error])


    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {isLoading ? <Loader/> : children}
        </UserContext.Provider>
    )
}

export default UserProvider
