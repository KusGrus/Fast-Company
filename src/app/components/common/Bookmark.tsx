import React from 'react'
import { BookmarkProps } from '../types'

const Bookmark = ({ user, onMark }: BookmarkProps) => {
    const baseClasses = 'bi bi-bookmark'
    const classes = baseClasses + (user.bookmark ? '-fill' : '')
    return (
        <i className={classes} onClick={() => onMark(user)} role={'button'} />
    )
}

export default Bookmark
