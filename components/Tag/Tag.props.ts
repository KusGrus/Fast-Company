import {DetailedHTMLProps, HTMLAttributes} from 'react'

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    size?: 'small' | 'medium'
    color?: 'ghost' | 'red' | 'green' | 'gray' | 'primary'
    href?: string
}
