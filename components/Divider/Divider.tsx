import styles from './Divider.module.css'
import {DividerProps} from './Divider.props'

export const Divider = (props: DividerProps) => {
    return <hr {...props} className={styles.hr}/>
}
