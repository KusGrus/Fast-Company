// @ts-ignore
import cn from 'classnames'
import styles from './Sidebar.module.css'
import {PropsWithChildren} from 'react'
import {SidebarProps} from './Sidebar.props'
import Menu from '../Menu/Menu'
import Logo from '../../public/icons/logo.svg'
import {Search} from '../../components'

export const Sidebar = ({children, className, ...props}: PropsWithChildren<SidebarProps>) => {
    return (
        <div {...props} className={cn(className, styles.sidebar)}>
            <Logo />
            <Search/>
            <Menu/>
        </div>
    )
}
