export const initAnsverEvent = ({ listElementData, commentTextareaElement, listElement, initLikeEvent, initRedactorEvent, initDeleteEvent, nameInputElement, renderListElement }) => {
    for (const comment of document.querySelectorAll('.comment')) {
      comment.addEventListener('click', () => {
        const index = comment.dataset.index;
        const commentText = `${listElementData[index].name}: "${listElementData[index].comment}"`;

        commentTextareaElement.value = `QUOTE_BEGIN ${commentText} QUOTE_END`;

        renderListElement({ listElement, listElementData, initLikeEvent, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement, nameInputElement });
      })
    }
  }