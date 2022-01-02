import React from 'react'
import CommentForm from './CommentForm'
import { CommentFormData } from '../../hooks/types'
import { useComments } from '../../hooks/useComments'
import Card from '../common/Card'
import Comment from '../common/Comment'

const Comments = () => {
    const { comments, createComment, deleteComments } = useComments()

    const handleDelete = async (commentId: string) => {
        await deleteComments(commentId)
    }

    const handleSend = async (data: CommentFormData) => {
        await createComment(data)
    }

    return (
        <div className="col-md-8">
            <CommentForm onSend={handleSend}/>
            {!!comments.length && <Card center={false}>
                <h2>Comments</h2>
                <hr/>
                {comments.map(c => (
                    <Comment key={c._id}
                        comment={c}
                        onDelete={handleDelete}/>
                ))}
            </Card>}
        </div>
    )
}

export default Comments
