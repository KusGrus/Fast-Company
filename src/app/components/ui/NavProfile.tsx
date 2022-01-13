import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RandomAvatar from '../common/RandomAvatar'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { getCurrentUserData } from '../../store/users'

const NavProfile = () => {
    const user = useTypedSelector(getCurrentUserData)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const toggleMenu = () => setIsOpen(prevState => !prevState)
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{user?.name}</div>
                <RandomAvatar width={40} src={user?.imageSrc}/>
            </div>
            <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
                <Link to={'/users/' + user?._id} className="dropdown-item">Profile</Link>
                <Link to='/logout' className="dropdown-item">Logout</Link>
            </div>
        </div>
    )
}

export default NavProfile
