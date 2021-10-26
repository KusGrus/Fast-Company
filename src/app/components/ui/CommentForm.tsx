import React from 'react'
import Card from '../common/Card'
import { CommentFormProps, requiredText } from '../types'
import useForm from '../../hooks/useForm'
import Validators from '../../common/validators'
import SelectField from '../common/form/SelectField'
import TextareaField from '../common/form/TextareaField'

const CommentForm = ({ users, onSend }: CommentFormProps) => {
    const { state, submit } = useForm({
        user: [null, [Validators.required({ message: requiredText })]],
        content: ['', [Validators.required({ message: requiredText })]]
    })

    const onSubmit = (data: any) => onSend(data)

    return (
        <Card center={false}>
            <form onSubmit={submit(onSubmit)}>
                <h2>New comment</h2>
                <SelectField items={users}
                    value={state.user.value}
                    error={state.user.errors[0]?.message}
                    onChange={state.user.patchValue}/>

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
