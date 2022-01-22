// @ts-ignore
import cn from 'classnames'
import  styles from './Paragraph.module.css'
import {PropsWithChildren} from 'react'
import {ParagraphProps} from './Paragraph.props'

export const Paragraph = ({children, className, size = 'medium', ...props}: PropsWithChildren<ParagraphProps>) => {
    return (
        <p className={cn(styles.paragraph, className, {
            [styles.small]: size==='small',
            [styles.medium]: size==='medium',
            [styles.large]: size==='large'
        })} {...props}>
            {children}
        </p>
    )
}
