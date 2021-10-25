import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentForm from '../../ui/CommentForm'
import Card from '../../common/Card'
import Comment from '../../common/Comment'
import { CommentDTO, UserDTO } from '../../../../api/fake.api/api.model'
import api from '../../../../api/index'

const Comments = () => {
    const { id } = useParams<{id: string}>()
    const [comments, setComments] = useState<CommentDTO[]>([])
    const [users, setUsers] = useState<UserDTO[]>([])

    useEffect(() => {
        api.users.fetchAll().then((data: any) => setUsers(data))
        api.comments.fetchCommentsForUser(id).then((data: any) => setComments(data))
    }, [])

    const sortComments = (comments: CommentDTO[]) => {
        return comments.sort((a, b) => +a.createdAt - +b.createdAt)
    }

    const handleDelete = (commentId: string) => {
        api.comments.remove(commentId).then(() => setComments(prevState => prevState.filter(state => state._id !== commentId)))
    }

    const handleSend = (data: any) => {
        const body = {
            userId: data.user._id,
            pageId: id,
            content: data.content
        }
        api.comments.add(body as CommentDTO).then((comment: any) =>
            setComments(prevState => ([...prevState, comment])))
    }

    return (
        <div className="col-md-8">
            <CommentForm users={users} onSend={handleSend}/>
            {comments.length && <Card center={false}>
                <h2>Comments</h2>
                <hr/>
                {comments.map(c => (
                    <Comment key={c._id} comment={c}
                        user={users.find(u => u._id === c.userId)}
                        onDelete={handleDelete}/>
                ))}
            </Card>}

        </div>
    )
}

export default Comments
