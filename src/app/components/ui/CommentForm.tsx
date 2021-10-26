import React from 'react'
import Card from '../common/Card'
import { CommentFormProps } from '../types'

const CommentForm = ({ users, onSend }: CommentFormProps) => {
    const onSubmit = (data: any) => onSend(data)

    return (
        <Card center={false}>
            <h1>te</h1>
        </Card>
    )
}

export default CommentForm
