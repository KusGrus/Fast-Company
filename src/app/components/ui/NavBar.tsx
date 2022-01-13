import React from 'react'
import { NavLink } from 'react-router-dom'
import NavProfile from './NavProfile'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { getIsLoggedIn } from '../../store/users'

const NavBar = () => {
    const isLoggedIn = useTypedSelector(getIsLoggedIn)
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink className="nav-link"
                            exact
                            aria-current="page"
                            activeStyle={{ fontWeight: 'bold' }}
                            to='/'>
                            Main
                        </NavLink >
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item">
                            <NavLink className="nav-link"
                                aria-current="page"
                                activeStyle={{ fontWeight: 'bold' }}
                                to='/users'>
                                Users
                            </NavLink >
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {isLoggedIn
                        ? <NavProfile/>
                        : (
                            <NavLink className="nav-link"
                                aria-current="page"
                                activeStyle={{ fontWeight: 'bold' }}
                                to='/login'>
                            Login
                            </NavLink >
                        )}
                </div>
            </div>
        </nav>

    )
}

export default NavBar
