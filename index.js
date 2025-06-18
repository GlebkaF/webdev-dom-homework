import { fetchComments } from './modules/api.js'
import { updateComments } from './modules/comments.js'
import { initAddCommentListener } from './modules/initListeners.js'
import { renderComments } from './modules/renderComments.js'


export const fetchAndRenderComments = (isFirstLoading) => {
    if (isFirstLoading) {
        document.querySelector('.container').innerHTML = `<p>Пожалуйста, подождите. Идет загрузка...</p>`
    }


fetchComments().then((data) => {
    updateComments(data)
    renderComments()
})
}
fetchAndRenderComments(true)
