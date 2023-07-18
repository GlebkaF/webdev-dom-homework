import { renderListElement } from "./renderListElement.js";

export const initLikeEvent = ({ listElement, listElementData, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement }) => {
    for (const likeButton of document.querySelectorAll('.like-button')) {
        likeButton.addEventListener('click', () => {
            event.stopPropagation();
            const index = likeButton.dataset.index;
            if (listElementData[index].like === false) {
                listElementData[index].like = true;
                listElementData[index].likeNumber += 1;
            } else {
                listElementData[index].like = false;
                listElementData[index].likeNumber -= 1;
            }

            renderListElement({ listElement, listElementData, initLikeEvent, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement });
        })
    }
}