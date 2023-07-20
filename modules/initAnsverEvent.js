import { renderListElement } from "./renderListElement.js";

export const initAnsverEvent = ({ listElementData, commentTextareaElement }) => {
    for (const comment of document.querySelectorAll('.comment')) {
      comment.addEventListener('click', () => {
        const index = comment.dataset.index;
        const commentText = `${listElementData[index].name}: "${listElementData[index].comment}"`;

        commentTextareaElement.value = `QUOTE_BEGIN ${commentText} QUOTE_END`;

        renderListElement({ listElementData, commentTextareaElement});
      })
    }
  }