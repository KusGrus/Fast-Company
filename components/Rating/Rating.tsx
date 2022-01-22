// @ts-ignore
import cn from 'classnames'
import React, {ForwardedRef, forwardRef, useEffect, useState} from 'react'
import styles from './Rating.module.css'
import StarIcon from '../../public/icons/star.svg'
import {RatingProps} from './Rating.props'

export const Rating = forwardRef(({
    isEditable = false,
    rating,
    setRating,
    className,
    error,
    ...props
}: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [arrayRating, setArrayRating] = useState<JSX.Element[]>(new Array(5).fill(<></>))

    const constructRating = (newRating: number) => {
        const updatedRating = arrayRating.map((el, idx) =>
            <StarIcon key={idx}
                className={cn(styles.star, {[styles.filled]: idx < newRating, [styles.editable]: isEditable})}
                tabIndex={isEditable ? 0 : -1}
                onMouseEnter={() => handleHover(idx + 1)}
                onKeyPress={(e: any) => handleKeyDown(e, idx + 1)}
                onClick={() => handleClick(idx + 1)}/>
        )
        setArrayRating(updatedRating)
    }

    useEffect(() => {
        constructRating(rating)
    }, [rating])

    const handleHover = (idx: number) => {
        if (isEditable) {
            constructRating(idx)
        }
    }

    const handleClick = (idx: number) => {
        if (isEditable && setRating) {
            setRating(idx)
        }
    }

    const handleKeyDown = (e: KeyboardEvent, idx: number) => {
        if (e.keyCode === 32 && setRating && isEditable) {
            setRating(idx)
        }
    }

    return (
        <div {...props} className={cn(styles.rating, {[styles.error]: error})} ref={ref} onMouseLeave={() => handleHover(rating)}>
            {arrayRating.map((r, i) => <span key={i}>{r}</span>)}
            {error && <span className={styles['error-message']}>{error.message}</span>}
        </div>
    )
})
