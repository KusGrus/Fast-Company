// @ts-ignore
import cn from 'classnames'
import styles from './Input.module.css'
import {InputProps} from './Input.props'
import {ForwardedRef, forwardRef} from 'react'

export const Input = forwardRef(({className, error, ...props}: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <div className={cn(styles['input-wrapper'], className)}>
            <input className={cn(styles.input, {[styles.error]: error})} ref={ref} {...props} />
            {error && <span className={styles['error-message']}>{error.message}</span>}
        </div>
    )
})
