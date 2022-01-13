import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from './store'
import { CommentDTO, CommentFormData } from '../hooks/types'
import commentService from '../services/comment.service'
import { nanoid } from 'nanoid'

interface CommentsState {
    entities: CommentDTO[]
    isLoading: boolean
    error: string | null
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: [],
        isLoading: true,
        error: null
    } as CommentsState,
    reducers: {
        requested: state => {
            state.isLoading = true
        },
        received: (state, { payload }: PayloadAction<CommentDTO[]>) => {
            state.entities = payload
            state.isLoading = false
        },
        fail: (state, { payload }: PayloadAction<string>) => {
            state.error = payload
            state.isLoading = false
        },
        addComment: (state, { payload }: PayloadAction<CommentDTO>) => {
            state.entities.push(payload)
        },
        deleteComment: (state, { payload }: PayloadAction<string>) => {
            state.entities = state.entities.filter(c => c._id !== payload)
        }
    }
})

export const { reducer, actions } = commentsSlice
const { received, requested, fail, addComment, deleteComment } = actions

export const loadComments = (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(requested())
    try {
        const { content } = await commentService.get(userId)
        dispatch(received(content))
    } catch (e) {
        dispatch(fail(e.message))
    }
}

export const createComment = (id: string, userId: string, data: CommentFormData) => async (dispatch: AppDispatch) => {
    const comment: CommentDTO = {
        ...data,
        userId,
        _id: nanoid(),
        pageId: id,
        createdAt: Date.now()
    }
    try {
        const { content } = await commentService.add(comment)
        dispatch(addComment(content))
    } catch (e) {
        dispatch(fail(e.message))
    }
}

export const deleteComments = (id: string) => async (dispatch: AppDispatch) => {
    try {
        await commentService.delete(id)
        dispatch(deleteComment(id))
    } catch (e) {
        dispatch(fail(e.message))
    }
}


export const getComments = (state: RootState) => state.comments.entities
export const getCommentsIsLoading = (state: RootState) => state.comments.isLoading

export default reducer
