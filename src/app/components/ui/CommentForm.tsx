import React from 'react'
import Card from '../common/Card'
import SelectField from '../common/form/SelectField'
import Validators from '../../common/validators'
import useForm from '../../hooks/useForm'
import { CommentFormProps, requiredText } from '../types'
import TextareaField from '../common/form/TextareaField'

const CommentForm = ({ users, onSend }: CommentFormProps) => {
    const { register, get, change: handleChange, submit: handleSubmit } = useForm()

    const userControl = get('user')
    const contentControl = get('content')

    const onSubmit = (data: any) => onSend(data)

    return (
        <Card center={false}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>New comment</h2>
                <SelectField items={users}
                    name="user"
                    ref={register(null, [Validators.required({ message: requiredText })])}
                    value={userControl?.value}
                    error={userControl?.errors[0]?.message}
                    onChange={handleChange}/>

                <TextareaField label="Comment"
                    name="content"
                    ref={register(null, [Validators.required({ message: requiredText })])}
                    value={contentControl?.value}
                    error={contentControl?.errors[0]?.message}
                    onChange={handleChange}/>

                <div className="d-flex justify-content-end mb-4">
                    <button type="submit" className="btn btn-primary w-25">Send</button>
                </div>
            </form>
        </Card>
    )
}

export default CommentForm
