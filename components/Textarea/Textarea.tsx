// @ts-ignore
import cn from 'classnames'
import styles from './Textarea.module.css'
import {TextareaProps} from './Textarea.props'
import {ForwardedRef, forwardRef} from 'react'

export const Textarea = forwardRef(({children, className, error, ...props}: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
        <div className={cn(styles['textarea-wrapper'], className)}>
            <textarea  className={cn(styles.textarea, {[styles.error]: error})} ref={ref} {...props}/>
            {error && <span className={styles['error-message']}>{error.message}</span>}
        </div>
    )
})
