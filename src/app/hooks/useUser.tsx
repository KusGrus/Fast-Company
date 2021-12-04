import React, { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { UseUserContext } from './types'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import Loader from '../components/common/loader/Loader'
import { UserDTO } from '../../api/fake.api/api.model'


const UserContext = React.createContext<UseUserContext | null>(null)

export const useUser = (): UseUserContext => {
    return useContext(UserContext) as UseUserContext
}

const UserProvider = ({ children }: PropsWithChildren<any>) => {
    const [users, setUsers] = useState<UserDTO[]>([])
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
        <UserContext.Provider value={{ users }}>
            {isLoading ? <Loader/> : children}
        </UserContext.Provider>
    )
}

export default UserProvider
