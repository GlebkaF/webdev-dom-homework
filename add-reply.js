import { appComments } from "./api.js";
import { renderComments } from "./render.js";
import { commentText } from "./script.js";

export const addReply = () => {
    const commentsElements = document.querySelectorAll('.comment');

    for (const commentsElement of commentsElements) {

        commentsElement.addEventListener('click', () => {

            const index = commentsElement.dataset.index;
            const mentionText = appComments[index].text;
            const mentionName = appComments[index].name;
            const newCommentText = `QUOTE_BEGIN ${mentionText} \n ${mentionName} QUOTE_END \n`;
            commentText.value = newCommentText;

            renderComments(appComments);
        })
    }
}