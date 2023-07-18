// import { renderListElement } from "./renderListElement.js";

export const initAnsverEvent = ({ listElementData }) => {
    for (const comment of document.querySelectorAll('.comment')) {
      comment.addEventListener('click', () => {
        const index = comment.dataset.index;
        const commentText = `${listElementData[index].name}: "${listElementData[index].comment}"`;

        text = `QUOTE_BEGIN ${commentText} QUOTE_END`;

        renderListElement();
      })
    }
  }