import React, { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { CommentDTO, CommentFormData, UseCommentsContext } from './types'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useAuth } from './useAuth'
import { nanoid } from 'nanoid'
import commentService from '../services/comment.service'

const CommentsContext = React.createContext<UseCommentsContext | null>(null)

export const useComments = (): UseCommentsContext => {
    return useContext(CommentsContext) as UseCommentsContext
}

const CommentsProvider = ({ children }: PropsWithChildren<any>) => {
    const { id } = useParams<{ id: string }>()
    const { user } = useAuth()
    const [comments, setComments] = useState<CommentDTO[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const errorCatcher = (e: { response: { data: { message: any } } }) => {
        const { message } = e.response.data
        setError(message)
        setLoading(false)
    }

    const createComment = async (data: CommentFormData) => {
        const comment: CommentDTO = {
            ...data,
            _id: nanoid(),
            pageId: id,
            userId: user?._id as string,
            createdAt: Date.now()
        }
        try {
            const { content } = await commentService.add(comment)
            setComments(prevState => [content, ...prevState])
        } catch (e) {
            errorCatcher(e)
        }
    }

    const getComments = async () => {
        try {
            const { content } = await commentService.get(id)
            setComments(content.sort((a, b) => +b.createdAt - +a.createdAt))
        } catch (e) {
            errorCatcher(e)
        } finally {
            setLoading(false)
        }
    }

    const deleteComments = async (id: string) => {
        try {
            await commentService.delete(id)
            setComments(prevState => prevState.filter(c => c._id !== id))
        } catch (e) {
            errorCatcher(e)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (error) {
            console.log(error)
            toast.error(error)
            setError(null)
        }
    }, [error])

    useEffect(() => {
        setComments([])
        getComments().then()
    }, [id])


    return (
        <CommentsContext.Provider value={{ comments, createComment, deleteComments }}>
            {children}
        </CommentsContext.Provider>
    )
}

export default CommentsProvider
