//import { commentElement } from "./main.js";

// Клик на комментарий, ответ на комментарий
export function clickForAnswer({ comments, renderComments }) {
    const commentItems = document.querySelectorAll('.comment');

    for (const commentItem of commentItems) {
        commentItem.addEventListener('click', () => {
        const index = commentItem.dataset.index;
        //console.log(index);
        const comment = comments[index];
        commentElement.value = `${comment.text}\n${comment.name}`;
        renderComments({ comments });
        })
    }
}
