import { renderListElement } from "./renderListElement.js";

export const initRedactorEvent = ({ listElementData }) => {
    for (const redactorButton of document.querySelectorAll('.redactor-button')) {
        redactorButton.addEventListener('click', () => {
            event.stopPropagation();
            const index = redactorButton.dataset.index;
            console.log(index);

            renderListElement({ listElementData });
        })
    }
}