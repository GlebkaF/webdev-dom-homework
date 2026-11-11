export function addLikeListeners(comments, commentsEl, onChange) {
    const likeButtons = commentsEl.querySelectorAll('.like-button')

    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', function (event) {
            event.stopPropagation()

            const index = likeButton.dataset.index
            const comment = comments[index]

            comment.isLiked = !comment.isLiked

            if (comment.isLiked === true) {
                comment.likes += 1
            } else {
                comment.likes -= 1
            }

            onChange()
        })
    }
}
