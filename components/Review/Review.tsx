// @ts-ignore
import cn from 'classnames'
import styles from './Review.module.css'
import {ReviewProps} from './Review.props'
import UserIcon from '../../public/icons/user.svg'
import {format} from 'date-fns'
import {ru} from 'date-fns/locale'
import {Rating} from '../Rating/Rating'

export const Review = ({className, review, ...props}: ReviewProps) => {
    const {name, title, description, createdAt, rating} = review
    return (
        <div className={styles.review} {...props}>
            <UserIcon className={styles.user}/>
            <div className={styles.title}>
                <span className={styles.name}>{name}:</span>&nbsp;&nbsp;
                <span>{title}</span>
            </div>
            <div className={styles.date}>
                {format(new Date(createdAt), 'dd MMMM yyyy', {locale: ru})}
            </div>
            <div className={styles.rating}>
                <Rating rating={rating}/>
            </div>
            <div className={styles.description}>
                {description}
            </div>
        </div>
    )
}
