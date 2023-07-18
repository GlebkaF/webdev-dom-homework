export const initRedactorEvent = ({ listElement, listElementData, initLikeEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement, renderListElement }) => {
    for (const redactorButton of document.querySelectorAll('.redactor-button')) {
        redactorButton.addEventListener('click', () => {
            event.stopPropagation();
            const index = redactorButton.dataset.index;
            console.log(index);

            renderListElement({ listElement, listElementData, initLikeEvent, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement });
        })
    }
}