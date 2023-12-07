import { renderForm } from './renderForm.js'
import { renderError } from './renderError.js';
import { getTodos, postTodos } from './api.js';
import { responseComment } from './responseComment.js';
import { Comments } from './renderComments.js'
import { changeFormButton, changeLikeButton } from './changeButtons.js';

let comments = [];
const addFormButton = document.getElementById("add-form-button");
const nameInputElement = document.getElementById('add-form-name');
const textInputElement = document.getElementById('add-form-text');

// получение комментариев гет-запрос на сервер
const getComments = (message) => {
    renderForm(message, true);
    getTodos()
        .then((responseData) => {
            comments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date).toLocaleString(),
                    likesCount: comment.likes,
                    isLiked: comment.isLiked,
                    text: comment.text,
                };
            });
            renderComents();
            changeFormButton(false, '#bcec30', addFormButton)
            renderForm('', false);
            renderError(false);
        })
        .catch((error) => {
            renderForm(false);
            changeFormButton(false, '#bcec30',addFormButton);
            if (error.message === "Сервер сломался") {
                nameInputElement.value = '';
                textInputElement.value = '';
                renderError(error.message, true);
            } else {
                renderError('Кажется, у вас сломался интернет, попробуйте позже', true);
            }
        });
}
getComments('Комментарии грузятся');

// кнопка лайка
function likeButtonListeners() {
    const likeElements = document.querySelectorAll(".like-button");
    for (const likeElement of likeElements) {
        likeElement.addEventListener("click", (event) => {
            event.stopPropagation();
            changeLikeButton(likeElement, comments);
            renderComents();
        });
    }
};

const renderComents = () => {
    Comments(comments);
    likeButtonListeners();
    responseComment(nameInputElement, textInputElement, comments);
};
renderComents();

// отправка комментария на сервер
addFormButton.addEventListener("click", () => {
    nameInputElement.classList.remove("error");
    textInputElement.classList.remove("error");

    if (nameInputElement.value === "" || nameInputElement.value.length < 3) {
        nameInputElement.classList.add("error");
    }

    if (textInputElement.value === "" || textInputElement.value.length < 3) {
        textInputElement.classList.add("error");
    }

    renderForm('Комментарий добавляется', true)
    changeFormButton(true, 'grey',addFormButton);
    postTodos(nameInputElement, textInputElement)
        .then(() => {
            getComments('Комментарий добавляется');
            renderError(false);
            nameInputElement.value = '';
            textInputElement.value = '';
            renderComents();
        })
        .catch((error) => {
            renderForm(false);
            changeFormButton(false, '#bcec30',addFormButton);
            if (error.message === "Ошибка запроса") {
                renderError('Имя и комментарий должны быть не короче 3 символов', true);
                return;
            }
            if (error.message === "Сервер сломался") {
                renderError(error.message, true);
                return;
            } else {
                renderError('Кажется, у вас сломался интернет, попробуйте позже', true);
                return;
            }
        });
});
