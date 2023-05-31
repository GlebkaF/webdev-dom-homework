import { comments } from "./comments.js";
import { renderComments } from "./main.js";

const likeButtonsListeners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    const likeCountElements = document.querySelectorAll('.likes-counter');

    for (const likeButtonElement of likeButtonElements) {

        likeButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            likeButtonElement.classList.add("-loading-like");
            const comment = comments[likeButtonElement.dataset.index];

            delay(2000).then(() => {
                // console.log(comment);
                comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
                comment.isLiked = !comment.isLiked;
                renderComments();
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