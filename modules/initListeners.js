import { fetchComments, postComment } from './api.js'
import { comments, updateComments } from './comments.js'
import { renderRegistration } from './renderRegistration.js'
import { deleteHtml } from './sanitizeHtml.js'

export const initLikeListeners = (renderComments) => {
    const addLikes = document.querySelectorAll('.like-button')
    for (const addLike of addLikes) {
        addLike.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = addLike.dataset.index
            const comment = comments[index]

            addLike.classList.add('like-loading')

            function delay(interval = 300) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve()
                    }, interval)
                })
            }
            delay(1000).then(() => {
                comment.likes = comment.isLiked
                    ? comment.likes - 1
                    : comment.likes + 1
                comment.isLiked = !comment.isLiked
                comment.isLikeLoading = true

                addLike.classList.remove('like-loading')

                renderComments()
            })
        })
    }
}

export const initReplyListeners = () => {
    const text = document.getElementById('text-input')
    const commentsElements = document.querySelectorAll('.comment')
    for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', () => {
            const chosenComment = comments[commentElement.dataset.index]
            text.value = `${chosenComment.name}: ${chosenComment.text}`
        })
    }
}

export const initAddCommentListener = (renderComments) => {
    const name = document.getElementById('name-input')
    const text = document.getElementById('text-input')
    const button = document.querySelector('.add-form-button')

    button.addEventListener('click', () => {
        if (name.value.trim() === '' || text.value.trim() === '') {
            alert('Заполните все поля')
            return
        }

        document.querySelector('.form-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

        postComment(deleteHtml(name.value), deleteHtml(text.value))
            .then(() => {
                return fetchComments()
            })
            .then((data) => {
                document.querySelector('.form-loading').style.display = 'none'
                document.querySelector('.add-form').style.display = 'flex'

                updateComments(data)
                renderComments()
                name.value = ''
                text.value = ''
            })
            .catch((error) => {
                document.querySelector('.form-loading').style.display = 'none'
                document.querySelector('.add-form').style.display = 'flex'

                if (error.message === 'Failed to fetch') {
                    alert('Отсутствует подключение к интернету')
                }

                if (error.message === 'Ошибка сервера') {
                    alert('Ошибка сервера')
                }

                if (
                    error.message ===
                    'Количество символов должно быть не менее трех'
                ) {
                    alert('Количество символов должно быть не менее трех')
                    name.classList.add('-error')
                    text.classList.add('-error')

                    setTimeout(() => {
                    name.classList.remove('-error')
                    text.classList.remove('-error')
                    }, 2000)
                }
            })
    })
}

export const likesAnimation = document.querySelectorAll('.like-button')
for (likesAnimations of likesAnimation) {
    likesAnimations.addEventListener(
        'click',
        () => {
            likesAnimation.classList.add('like-loading')
        },
        setTimeout(() => {
            likesAnimation.classList.remove('like-loading')
        }, 1000),
    )
}
