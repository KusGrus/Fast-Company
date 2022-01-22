import {DetailedHTMLProps, HTMLAttributes} from 'react'

export interface HTagProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    tag: 'h1' | 'h2' | 'h3'
}
