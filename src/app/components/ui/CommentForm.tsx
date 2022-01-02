import React from 'react'
import Card from '../common/Card'
import { CommentFormProps, requiredText } from '../types'
import useForm from '../../hooks/useForm'
import Validators from '../../common/validators'
import TextareaField from '../common/form/TextareaField'
import { CommentFormData } from '../../hooks/types'

const CommentForm = ({ onSend }: CommentFormProps) => {
    const { state, submit, reset } = useForm({
        content: ['', [Validators.required({ message: requiredText })]]
    })

    const onSubmit = async (data: CommentFormData) => {
        await onSend(data)
        reset()
    }

    return (
        <Card center={false}>
            <form onSubmit={submit(onSubmit)}>
                <h2>New comment</h2>
                <TextareaField label="Comment"
                    name="content"
                    value={state.content.value}
                    error={state.content.errors[0]?.message}
                    onChange={state.content.patchValue}/>

                <div className="d-flex justify-content-end mb-4">
                    <button type="submit" className="btn btn-primary w-25">Send</button>
                </div>
            </form>
        </Card>
    )
}

export default CommentForm
