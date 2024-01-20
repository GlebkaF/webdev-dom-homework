
/* import { commentList } from "./main";
import { renderComments } from "./render"; */
export const initDeleteButtonsListeners = () => {
    const deleteButtonsElements = document.querySelectorAll(".delete-form-button");
    for (const deleteButtonsElement of deleteButtonsElements) {
        deleteButtonsElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = deleteButtonsElement.dataset.index;
            commentList.splice(index, 1);
            renderComments();
        });
    }

};