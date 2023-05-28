import { renderComments } from "./render.js";

export const addReply = () => {
    const commentsElements = document.querySelectorAll('.comment');

    for (const commentsElement of commentsElements) {

        commentsElement.addEventListener('click', () => {

            const index = commentsElement.dataset.index;
            const mentionText = comments[index].text;
            const mentionName = comments[index].name;
            const newCommentText = `QUOTE_BEGIN ${mentionText} \n ${mentionName} QUOTE_END \n`;
            commentText.value = newCommentText;

            renderComments();
        })
    }
}