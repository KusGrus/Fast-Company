import React from 'react'
import { CommentProps } from '../types'
import RandomAvatar from './RandomAvatar'
import Loader from './loader/Loader'
import utils from '../../common/utils'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { getCurrentUserId, getUserById } from '../../store/users'

const Comment = ({ comment, onDelete }: CommentProps) => {
    const date = utils.timeLeft(comment.createdAt)

    const userId = useTypedSelector(getCurrentUserId)
    const user = useTypedSelector(getUserById(comment.userId))

    if (!comment) {
        return <Loader/>
    } else {
        return (
            <div className="bg-light card-body mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start">
                            <RandomAvatar width={75} src={user?.imageSrc}/>
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1">{user?.name}
                                            <span className="small" style={{ marginLeft: '10px' }}>{date}</span>
                                        </p>
                                        {userId === comment.userId && (
                                            <button className="btn btn-sm text-primary d-flex align-items-center"
                                                onClick={() => onDelete(comment._id)}>
                                                <i className="bi bi-x-lg"/>
                                            </button>
                                        )}
                                    </div>
                                    <p className="small mb-0">{comment.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment
