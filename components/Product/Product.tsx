// @ts-ignore
import cn from 'classnames'
import React, {ForwardedRef, forwardRef, useRef} from 'react'
import styles from './Product.module.css'
import {ProductProps} from './Product.props'
import {Card} from '../Card/Card'
import {Rating} from '../Rating/Rating'
import {Tag} from '../Tag/Tag'
import {Button} from '../Button/Button'
import {declOfNum, price} from '../../helpers/helper'
import {Divider} from '../Divider/Divider'
import Image from 'next/image'
import {useState} from 'react'
import {Review} from '../Review/Review'
import {ReviewForm} from '../ReviewForm/ReviewForm'
import {motion, Variants} from 'framer-motion'

export const Product = motion(forwardRef(({
    className,
    product,
    ...props
}: ProductProps, ref: ForwardedRef<HTMLDivElement>) => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false)
    const reviewRef = useRef<HTMLDivElement>(null)

    const toggle = (): void => setIsReviewOpened(prevState => !prevState)

    const variants: Variants = {
        visible: {
            opacity: 1,
            height: 'auto'
        },
        hidden: {
            opacity: 0,
            height: 0
        }
    }


    const scrollToReview = () => {
        setIsReviewOpened(true)
        reviewRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
    }

    return (
        <div className={className} {...props} ref={ref}>
            <Card className={cn(styles.product)}>
                <div className={styles.logo}>
                    <Image src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title} width={70}
                        height={70}/>
                </div>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.price}>
                    {price(product.price)}
                    {product.oldPrice &&
                    <Tag className={styles['old-price']} color="green">{price(product.price - product.oldPrice)}</Tag>}
                </div>
                <div className={styles.credit}>{price(product.credit)}/<span>мес</span></div>
                <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating}/></div>
                <div className={styles.tags}>{product.categories.map(c => <Tag key={c} color="ghost"
                    className={styles.category}>{c}</Tag>)}</div>
                <div className={styles['price-title']}>Цена</div>
                <div className={styles['credit-title']}>Кредит</div>
                <div
                    className={styles['rating-title']}>
                    <a href="#ref" onClick={scrollToReview}>
                        {product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
                    </a>
                </div>
                <div className={styles.hr}><Divider/></div>
                <div className={styles.description}>{product.description}</div>
                <div className={styles.feature}>
                    {product.characteristics.map(c => (
                        <div key={c.name} className={styles.characteristic}>
                            <span className={styles['characteristic-title']}>{c.name}</span>
                            <span className={styles['characteristic-dots']}/>
                            <span className={styles['characteristic-value']}>{c.value}</span>
                        </div>
                    ))}
                </div>
                <div className={styles['adv-block']}>
                    {product.advantages &&
                    <div className={styles.advantages}>
                        <div className={styles['adv-title']}>Приемущества</div>
                        <div>{product.advantages}</div>
                    </div>
                    }
                    {product.disadvantages &&
                    <div className={styles.disadvantages}>
                        <div className={styles['adv-title']}>Недостатки</div>
                        <div>{product.disadvantages}</div>
                    </div>
                    }
                </div>
                <div className={styles.hr2}><Divider/></div>
                <div className={styles.actions}>
                    <Button appearance="primary">Узнать подробнее</Button>
                    <Button appearance="ghost"
                        arrow={isReviewOpened ? 'down' : 'right'}
                        className={styles['read-button']}
                        onClick={toggle}
                    >Читать отзывы</Button>
                </div>
            </Card>
            <motion.div variants={variants} initial="hidden" animate={isReviewOpened ? 'visible' : 'hidden'}>
                <Card color="blue" className={styles.reviews} ref={reviewRef}>
                    {product.reviews.map(review => (
                        <React.Fragment key={review._id}>
                            <Review review={review}/>
                            <Divider/>
                        </React.Fragment>
                    ))}
                    <ReviewForm productId={product._id}/>
                </Card>
            </motion.div>
        </div>
    )
}))
