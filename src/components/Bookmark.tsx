import React from "react"
import {BookmarkProps} from "./types";


const Bookmark = ({user, onMark}: BookmarkProps) => {
    const baseClasses = 'bi bi-bookmark'
    const classes = baseClasses + (user.mark ? '-fill' : '')
    return <i className={classes} onClick={()=>onMark(user._id)} role={"button"}/>
}

export default Bookmark
