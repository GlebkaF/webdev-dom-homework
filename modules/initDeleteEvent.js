export const initDeleteEvent = ({ listElement, listElementData, initLikeEvent, initRedactorEvent, initAnsverEvent, commentTextareaElement, nameInputElement, renderListElement }) => {
    for (const deleteButton of document.querySelectorAll('.delete-button')) {
        deleteButton.addEventListener('click', () => {
            event.stopPropagation();
            const index = deleteButton.dataset.index;
            listElementData.splice(index, 1);

            renderListElement({ listElement, listElementData, initLikeEvent, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement, nameInputElement });
        })
    }
}