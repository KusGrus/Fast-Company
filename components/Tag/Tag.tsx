// @ts-ignore
import cn from 'classnames'
import {PropsWithChildren} from 'react'
import styles from './Tag.module.css'
import {TagProps} from './Tag.props'

export const Tag = ({
    children,
    size = 'small',
    color = 'ghost',
    className,
    ...props
}: PropsWithChildren<TagProps>): JSX.Element => {
    return (
        <div className={cn(styles.tag, className, {
            [styles.small]: size === 'small',
            [styles.medium]: size === 'medium',
            [styles.ghost]: color === 'ghost',
            [styles.red]: color === 'red',
            [styles.gray]: color === 'gray',
            [styles.green]: color === 'green',
            [styles.primary]: color === 'primary'
        })} {...props}>
            {children}
        </div>
    )
}
