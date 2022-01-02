import React, { useEffect } from 'react'
import Loader from '../components/common/loader/Loader'
import { useAuth } from '../hooks/useAuth'

const Logout = () => {
    const { logout } = useAuth()

    useEffect(() => {
        logout()
    }, [])

    return <Loader/>
}

export default Logout
