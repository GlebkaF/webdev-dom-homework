import { comments } from './modules/comments.js'
import { renderComments } from './modules/render-comments.js'
import { addReplyListeners } from './modules/reply-comment.js'
import { addLikeListeners } from './modules/like-comment.js'
import { addCommentListener } from './modules/add-comment.js'
import { fetchComments } from './modules/api.js'
import { postComment } from './modules/api.js'

const nameEl = document.querySelector('.add-form-name')
const textEl = document.querySelector('.add-form-text')
const buttonEl = document.querySelector('.add-form-button')
const commentsEl = document.querySelector('.comments')

function updateComments() {
    renderComments(comments, commentsEl)
    addReplyListeners(comments, commentsEl, textEl)
    addLikeListeners(comments, commentsEl, updateComments)
}

fetchComments((newComments) => {
    comments.splice(0, comments.length, ...newComments)
    updateComments()
})

addCommentListener(comments, nameEl, textEl, buttonEl, updateComments)
