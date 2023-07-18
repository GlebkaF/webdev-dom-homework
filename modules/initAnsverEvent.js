import { renderListElement } from "./renderListElement.js";


export const initAnsverEvent = ({ listElementData, commentTextareaElement, listElement, initLikeEvent, initRedactorEvent, initDeleteEvent }) => {
    for (const comment of document.querySelectorAll('.comment')) {
      comment.addEventListener('click', () => {

console.log(commentTextareaElement.value);

        const index = comment.dataset.index;
        console.log(listElementData[index]);
        const commentText = `${listElementData[index].name}: "${listElementData[index].comment}"`;

        commentTextareaElement.value = `QUOTE_BEGIN ${commentText} QUOTE_END`;
        console.log(commentTextareaElement.value);

        renderListElement({ listElement, listElementData, initLikeEvent, initRedactorEvent, initDeleteEvent, initAnsverEvent });
      })
    }
  }