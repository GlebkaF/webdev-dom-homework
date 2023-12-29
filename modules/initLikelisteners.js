import { studentsComments } from "./main.js";
import { fetchAndRenderComments} from "./main.js";
import { renderStudentsComments } from "./renderStudentsComments.js";


// Постановка лайков
export const initLikeListeners = () => {
    const likeButtons = document.querySelectorAll(".like-button");
    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation();

            const index = likeButton.dataset.index;
            studentsComments[index].likes += studentsComments[index].isLiked ? -1 : +1;
            studentsComments[index].isLiked = !studentsComments[index].isLiked;

            renderStudentsComments({studentsComments, fetchAndRenderComments});

        });
    };

};