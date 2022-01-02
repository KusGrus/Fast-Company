import React, { PropsWithChildren } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { RedirectProps, RouteProps } from 'react-router'

export interface RouteGuardProps extends RouteProps {
    redirect: RedirectProps
    guard: (...args: any) => boolean
}

const RouteGuard = ({
    component: Component,
    redirect,
    guard,
    children,
    ...rest
}: PropsWithChildren<RouteGuardProps>) => {
    return (
        <Route {...rest} render={(props) => {
            if (guard(props)) {
                return Component ? <Component {...props}/> : children
            } else {
                return <Redirect {...redirect} />
            }
        }
        }/>
    )
}

export default RouteGuard
