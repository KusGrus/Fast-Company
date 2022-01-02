import React, { PropsWithChildren } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Redirect, Route } from 'react-router-dom'
import { RouteProps } from 'react-router'

const ProtectedRoute = ({ component: Component, children, ...rest }: PropsWithChildren<RouteProps>) => {
    const { user } = useAuth()
    return (
        <Route {...rest} render={(props) => {
            if (!user) {
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
