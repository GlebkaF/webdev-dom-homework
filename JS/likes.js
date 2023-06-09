import { renderApp } from "./renderApp.js";
import { getCommentsList } from "./CommentsList.js";
import { newComments } from "./api.js";

const listElem = document.getElementById('list-comments');

const likeButtonsListeners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');

    for (const likeButtonElement of likeButtonElements) {

        likeButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();

            likeButtonElement.classList.add("-loading-like");
            const comment = newComments[likeButtonElement.dataset.index];

            delay(2000).then(() => {
                comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
                comment.isLiked = !comment.isLiked;
            }).then(() => {
                likeButtonElement.classList.remove("-loading-like");
                renderApp(newComments, listElem, getCommentsList);
            });
        });
    };
};


function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}


export { likeButtonsListeners };