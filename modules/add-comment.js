import { escapeHtml } from './escape-html.js'
import { postComment, fetchComments } from './api.js'
export function addCommentListener(
    comments,
    nameEl,
    textEl,
    buttonEl,
    onChange,
) {
    buttonEl.addEventListener('click', function () {
        if (nameEl.value.trim() === '' || textEl.value.trim() === '') {
            return
        }

        postComment(
            escapeHtml(nameEl.value.trim()),
            escapeHtml(textEl.value.trim()),
            () => {
                fetchComments((newComments) => {
                    comments.splice(0, comments.length, ...newComments)
                    onChange()

                    nameEl.value = ''
                    textEl.value = ''
                })
            },
        )
    })
}
