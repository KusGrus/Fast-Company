import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import NavProfile from './NavProfile'

const NavBar = () => {
    const { user } = useAuth()
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
                    {user && (
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
                    {user
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
