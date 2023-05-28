import { comments } from "./script.js";
import { renderComments } from "./render.js";

export const initLikesButton = () => {
    const likesButtons = document.querySelectorAll('.like-button');

    for (const likesButton of likesButtons) {
        likesButton.addEventListener('click', (event) => {
            event.stopPropagation();

            const index = likesButton.dataset.index;
            const status = comments[index].likeStatus;
            const value = +comments[index].likes;

            if (status === '-active-like') {
                comments[index].likes = value - 1;
                comments[index].likes
                comments[index].likeStatus = '';
                likesButton.classList.remove('-active-like');
            } else {
                comments[index].likes = value + 1;
                console.log(comments[index].likes)
                comments[index].likeStatus = '-active-like';
                likesButton.classList.add('-active-like');
            }

            renderComments();
        })
    }
}