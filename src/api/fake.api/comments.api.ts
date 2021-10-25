import { CommentDTO } from './api.model'

const comments: CommentDTO[] = [
    {
        _id: '67rdca3eeb7f6fg',
        userId: '67rdca3eeb7f6fgeed471815',
        pageId: '67rdca3eeb7f6fgeed471815',
        content: 'Lorem ipsum dolor',
        createdAt: '1633576399367'
    },
    {
        _id: '67rdca3eeb7f6fgdasd',
        pageId: '67rdca3eeb7f6fgeed471815',
        userId: '67rdca3eeb7f6fgeed471815',
        content: 'Lorem ipsum dolor and etc',
        createdAt: '1633573058520'
    },
    {
        _id: '67rdca3eeb7f6fgdaasd',
        pageId: '67rdca3eeb7f6fgeed471817',
        userId: '67rdca3eeb7f6fgeed471815',
        content: 'Lorem ipsum dolor and etc',
        createdAt: '1633573058520'
    }
]
if (!localStorage.getItem('comments')) {
    localStorage.setItem('comments', JSON.stringify(comments))
}
const fetchAll = () => new Promise((resolve) => {
    window.setTimeout(() => resolve(comments), 200)
})


const fetchCommentsForUser = (id: string) => new Promise((resolve) => {
    window.setTimeout(() => {
        resolve(JSON.parse(<string>localStorage.getItem('comments')).filter((c:CommentDTO) => c.pageId === id))
    }, 200)
})

const add = (data: CommentDTO) => new Promise((resolve) => {
    window.setTimeout(() => {
        const comments = JSON.parse(<string>localStorage.getItem('comments'))
        const newComment = {
            ...data,
            createdAt: Date.now(),
            _id: Math.random().toString(36).substr(2, 9)
        }
        comments.push(newComment)
        localStorage.setItem('comments', JSON.stringify(comments))
        resolve(newComment)
    }, 200)
})


const remove = (id: string) => new Promise((resolve) => {
    window.setTimeout(() => {
        const comments = JSON.parse(<string>localStorage.getItem('comments'))
        const newComments = comments.filter((c:CommentDTO) => c._id !== id)
        localStorage.setItem('comments', JSON.stringify(newComments))
        resolve(id)
    }, 200)
})


export default {
    fetchAll,
    fetchCommentsForUser,
    add,
    remove
}
