// @ts-ignore
import cn from 'classnames'
import styles from './Card.module.css'
import {ForwardedRef, forwardRef, PropsWithChildren} from 'react'
import {CardProps} from './Card.props'

export const Card = forwardRef(({
    children,
    className,
    color = 'white',
    ...props
}: PropsWithChildren<CardProps>, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div className={cn(className, styles.card, {[styles.blue]: color === 'blue'})} ref={ref} {...props}>
            {children}
        </div>
    )
})
