import { escapeHtml } from './escape-html.js'

export function addCommentListener(
    comments,
    nameEl,
    textEl,
    buttonEl,
    onChange,
) {
    buttonEl.addEventListener('click', function () {
        const date = new Date()

        const formattedDate =
            `${date.getDate().toString().padStart(2, '0')}.` +
            `${(date.getMonth() + 1).toString().padStart(2, '0')}.` +
            `${date.getFullYear().toString().slice(-2)} ` +
            `${date.getHours().toString().padStart(2, '0')}:` +
            `${date.getMinutes().toString().padStart(2, '0')}`

        if (nameEl.value.trim() === '' || textEl.value.trim() === '') {
            return
        }

        const newComment = {
            name: escapeHtml(nameEl.value.trim()),
            text: escapeHtml(textEl.value.trim()),
            likes: 0,
            isLiked: false,
            date: formattedDate,
        }

        comments.push(newComment)

        onChange()

        nameEl.value = ''
        textEl.value = ''
    })
}
