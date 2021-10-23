import React from 'react'
import { LoaderProps } from './types'
import './loader.scss'

const Loader = ({ fixed = false }: LoaderProps) => {
    const classes = ['lds-roller']
    if (fixed) {
        classes.push('fixed')
    }
    return (
        <React.Fragment>
            <div className={classes.join(' ')}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </React.Fragment>
    )
}

export default Loader
