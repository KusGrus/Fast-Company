import {PropsWithChildren} from 'react'
import  styles from './Htag.module.css'
import {HTagProps} from './Htag.props'

export const Htag = ({children, tag}: PropsWithChildren<HTagProps>): JSX.Element => {
    switch (tag) {
        case 'h2':
            return <h2 className={styles.h2}>{children}</h2>
        case 'h3':
            return <h3 className={styles.h3}>{children}</h3>
        default:
            return <h1 className={styles.h1}>{children}</h1>
    }
}
