// Переменные
const addCommentForm = document.querySelector(".add-form");
const buttonElement = document.querySelector(".add-form-button");
const listOfComments = document.querySelector(".comments");
const nameInputElement = document.querySelector(".add-form-name");
const commentInputElement = document.querySelector(".add-form-text");
const removeButton = document.querySelector('.remove-form-button');
const constWaitingComment = document.querySelector('.add-waiting');
const startingElement = document.querySelector('.starting');

// Импорты
import { delay, replaceValue, correctDate } from "./supportFunc.js";
import renderComments from "./renderComments.js";


// Создаем функцию fetch для получения списка
const fetchAndRenderTasks = (element) => {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/marina-obruch/comments", {
        method: "GET"
    })
        .then((responseStart) => {
            return responseStart.json();
        })
        .then((startJson) => {
            const comments = startJson.comments;
            listOfComments.classList.remove('hidden');
            startingElement.classList.add('hidden');

            renderComments(element, comments);
        })
        .catch((error) => {
            alert("Что-то пошло не так, попробуйте позднее");
            console.warn(error);
        })
};


// Добавляем новый комментарий в ленту
const postComment = (element) => {
    fetch('https://webdev-hw-api.vercel.app/api/v1/marina-obruch/comments', {
        method: "POST",
        body: JSON.stringify({
            name: replaceValue(nameInputElement.value),
            text: replaceValue(commentInputElement.value)
                .replaceAll('START_QUOTE', '<div class="comment-quote">')
                .replaceAll('END_QUOTE', '</div>'),
            forceError: false,
        })
    })
        .then((response) => {
            if (response.status === 400) throw new Error('Ошибка 400');
            if (response.status === 500) throw new Error('Ошибка 500');

            return response.json();
        })
        .then(() => {
            nameInputElement.value = "";
            commentInputElement.value = "";
            addCommentForm.classList.remove('hidden');
            constWaitingComment.classList.add('hidden');

            return fetchAndRenderTasks(element);
        })
        .catch((error) => {
            if (error.message === "Ошибка 400") {
                alert("Имя и комментарий должны быть не короче 3 символов");
                addCommentForm.classList.remove('hidden');
                constWaitingComment.classList.add('hidden');
            }
            else if (error.message === "Ошибка 500") {
                alert("Сервер сломался, попробуй позже");
                fetchAndRenderTasks(element);
            }
            else {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
                addCommentForm.classList.remove('hidden');
                constWaitingComment.classList.add('hidden');
            }
        });
}

export { fetchAndRenderTasks, postComment }