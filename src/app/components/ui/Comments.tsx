import React, { useEffect } from 'react'
import CommentForm from './CommentForm'
import { CommentFormData } from '../../hooks/types'
import Card from '../common/Card'
import Comment from '../common/Comment'
import { useAppDispatch } from '../../store/store'
import { createComment, deleteComments, getComments, getCommentsIsLoading, loadComments } from '../../store/comments'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import Loader from '../common/loader/Loader'
import { useParams } from 'react-router-dom'
import { getCurrentUserId } from '../../store/users'

const Comments = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()

    const isLoading = useTypedSelector(getCommentsIsLoading)
    const userId = useTypedSelector(getCurrentUserId)
    const comments = useTypedSelector(getComments)

    useEffect(() => {
        dispatch(loadComments(id))
    }, [id])

    const handleDelete = (commentId: string) => {
        dispatch(deleteComments(commentId))
    }

    const handleSend = (data: CommentFormData) => {
        dispatch(createComment(id, userId, data))
    }

    return (
        <div className="col-md-8">
            <CommentForm onSend={handleSend}/>
            {!!comments.length && <Card center={false}>
                <h2>Comments</h2>
                <hr/>
                {isLoading
                    ? <Loader/>
                    : comments.map(c => (
                        <Comment key={c._id}
                            comment={c}
                            onDelete={handleDelete}/>
                    ))}
            </Card>}
        </div>
    )
}

export default Comments
