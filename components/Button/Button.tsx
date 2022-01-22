// @ts-ignore
import cn from 'classnames'
import {ButtonProps} from './Button.props'
import  styles from './Button.module.css'
import ArrowIcon from '../../public/icons/arrow.svg'
import {PropsWithChildren} from 'react'

export const Button = ({children, appearance, arrow = 'none', className, ...props}: PropsWithChildren<ButtonProps>): JSX.Element => {
    return (
        <button className={cn(styles.button, className, {
            [styles.primary]: appearance === 'primary',
            [styles.ghost]: appearance === 'ghost'
        })} {...props}>
            {children}
            {arrow !=='none' ?
                <span className={cn(styles.arrow, {
                    [styles.down]: arrow === 'down',
                    [styles.right]: arrow === 'right'
                })}>
                    <ArrowIcon/>
                </span>
                : null
            }
        </button>
    )
}
