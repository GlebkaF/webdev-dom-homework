import { renderListElement } from "./renderListElement.js";

export const initRedactorEvent = ({ listElement, listElementData, commentTextareaElement, nameInputElement }) => {
    for (const redactorButton of document.querySelectorAll('.redactor-button')) {
        redactorButton.addEventListener('click', () => {
            event.stopPropagation();
            const index = redactorButton.dataset.index;
            console.log(index);

            renderListElement({ listElement, listElementData, commentTextareaElement, nameInputElement });
        })
    }
}