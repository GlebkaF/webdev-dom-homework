import { renderListElement } from "./renderListElement.js";

export const initDeleteEvent = ({ listElement, listElementData, commentTextareaElement, nameInputElement }) => {
    for (const deleteButton of document.querySelectorAll('.delete-button')) {
        deleteButton.addEventListener('click', () => {
            event.stopPropagation();
            const index = deleteButton.dataset.index;
            listElementData.splice(index, 1);

            renderListElement({ listElement, listElementData, commentTextareaElement, nameInputElement });
        })
    }
}