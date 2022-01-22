// @ts-ignore
import cn from 'classnames'
import {FunctionComponent, PropsWithChildren} from 'react'
import styles from './Layout.module.css'
import {LayoutProps} from './Layout.props'
import {Header} from './Header/Header'
import {Footer} from './Footer/Footer'
import {Sidebar} from './Sidebar/Sidebar'
import {AppProvider, IAppContext} from '../context/app.context'
import {Up} from '../components'

export const Layout = ({children, ...props}: PropsWithChildren<LayoutProps>) => {
    return (
        <div className={styles.wrapper}>
            <Header className={styles.header}/>
            <Sidebar className={styles.sidebar}/>
            <div className={styles.body}>
                {children}
            </div>
            <Footer className={styles.footer}/>
            <Up/>
        </div>
    )
}

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function (props: T): JSX.Element {
        return (
            <AppProvider menu={props.menu} firstCategory={props.firstCategory}>
                <Layout>
                    <Component {...props}/>
                </Layout>
            </AppProvider>
        )
    }
}
