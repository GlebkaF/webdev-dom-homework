
import { renderComments } from "./render.js";
import { appComments } from "./api.js";

export const initLikesButton = () => {
    const likesButtons = document.querySelectorAll('.like-button');

    for (const likesButton of likesButtons) {
        likesButton.addEventListener('click', (event) => {
            event.stopPropagation();

            const index = likesButton.dataset.index;
            const status = appComments[index].likeStatus;
            const value = +appComments[index].likes;

            if (status === '-active-like') {
                appComments[index].likes = value - 1;
                appComments[index].likes
                appComments[index].likeStatus = '';
                likesButton.classList.remove('-active-like');
            } else {
                appComments[index].likes = value + 1;
                console.log(appComments[index].likes)
                appComments[index].likeStatus = '-active-like';
                likesButton.classList.add('-active-like');
            }

            renderComments(appComments);
        })
    }
}