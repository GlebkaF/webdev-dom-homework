export function addReplyListeners(comments, commentsEl, textEl) {
    const commentElements = commentsEl.querySelectorAll('.comment')
    for (const commentEl of commentElements) {
        commentEl.addEventListener('click', () => {
            const index = commentEl.dataset.index
            const comment = comments[index]
            textEl.value = `${comment.name}: ${comment.text}`
        })
    }
}
