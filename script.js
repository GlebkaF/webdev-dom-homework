// Импорты
import {
    addCommentForm,
    buttonElement,
    listOfComments,
    nameInputElement,
    commentInputElement,
    removeButton,
    constWaitingComment,
    startingElement
} from "./data.js";

import { fetchAndRenderTasks, postComment } from "./api.js";


startingElement.classList.remove('hidden');
listOfComments.classList.add('hidden');

fetchAndRenderTasks(listOfComments);

// валидация на ввод
buttonElement.addEventListener('click', () => {
    function clickButton() {
        nameInputElement.classList.remove("error");
        if (nameInputElement.value === "") {
            nameInputElement.classList.add("error");
            return;
        }

        commentInputElement.classList.remove("error");
        if (commentInputElement.value === "") {
            commentInputElement.classList.add("error");
            return;
        }
        constWaitingComment.classList.remove('hidden');
        addCommentForm.classList.add('hidden');
        postComment(listOfComments);
    }
    clickButton();
});


// валидация на ввод (неактивная кнопка "Написать")
nameInputElement.addEventListener('input', () => {
    if (nameInputElement.value) {
        buttonElement.disabled = false;
        return;
    } else {
        buttonElement.disabled = true;
        return;
    }
});

commentInputElement.addEventListener('input', () => {
    if (commentInputElement.value) {
        buttonElement.disabled = false;
        return;
    } else {
        buttonElement.disabled = true;
        return;
    }
});