// @ts-ignore
import cn from 'classnames'
import styles from './ReviewForm.module.css'
import {ReviewFormProps} from './ReviewForm.props'
import {Input} from '../Input/Input'
import {Rating} from '../Rating/Rating'
import {Textarea} from '../Textarea/Textarea'
import {Button} from '../Button/Button'
import {Controller, useForm} from 'react-hook-form'
import {IReviewForm, IReviewSentResponse} from './ReviewForm.interface'
import axios from 'axios'
import {API} from '../../helpers/api'
import {useState} from 'react'


export const ReviewForm = ({className, productId, ...props}: ReviewFormProps) => {
    const {register, control, handleSubmit, formState: {errors}} = useForm<IReviewForm>()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const {data} = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId})
            if (data.message) {
                setIsSuccess(true)
            } else {
                setError('Что то пошло не так')
            }
        } catch (e: any) {
            setError(e.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.review} {...props}>
                <Input placeholder="Имя" {...register('name', {
                    required: {
                        value: true,
                        message: 'Поле обязательное'
                    }
                })}
                error={errors.name}/>
                <Input className={styles.title} placeholder="Заголовок отзыва" {...register('title', {
                    required: {
                        value: true,
                        message: 'Поле обязательное'
                    }
                })}
                error={errors.title}/>
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller control={control}
                        name="rating"
                        rules={{required: {value: true, message: 'Укажите рейтинг'}}}
                        render={({field}) =>
                            <Rating isEditable
                                rating={field.value}
                                ref={field.ref}
                                error={errors.rating}
                                setRating={field.onChange}/>}/>
                </div>
                <Textarea className={styles.description} placeholder="Текст отзыва" {...register('description', {
                    required: {
                        value: true,
                        message: 'Поле обязательное'
                    }
                })} error={errors.title}/>
                <div className={styles.submit}>
                    <Button appearance="primary">Отправить</Button>
                    <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
        </form>
    )
}
