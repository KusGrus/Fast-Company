import React, { useEffect } from 'react'
import Loader from '../components/common/loader/Loader'
import { useAppDispatch } from '../store/store'
import { logOut } from '../store/users'

const Logout = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(logOut())
    }, [])

    return <Loader/>
}

export default Logout
