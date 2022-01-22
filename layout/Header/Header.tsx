// @ts-ignore
import cn from 'classnames'
import styles from './Header.module.css'
import {PropsWithChildren} from 'react'
import {HeaderProps} from './Header.props'

export const Header = ({children, ...props}: PropsWithChildren<HeaderProps>) => {
    return (
        <div {...props}>
            Header
        </div>
    )
}
