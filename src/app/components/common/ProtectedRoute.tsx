import React, { PropsWithChildren } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { RouteProps } from 'react-router'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { getIsLoggedIn } from '../../store/users'

const ProtectedRoute = ({ component: Component, children, ...rest }: PropsWithChildren<RouteProps>) => {
    const isLoggedIn = useTypedSelector(getIsLoggedIn)
    return (
        <Route {...rest} render={(props) => {
            if (!isLoggedIn) {
                return <Redirect to={{
                    pathname: '/login',
                    state: {
                        from: props.location
                    }
                }}/>
            }
            return Component ? <Component {...props}/> : children
        }
        }/>
    )
}

export default ProtectedRoute
