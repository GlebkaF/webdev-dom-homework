import { renderForm } from './renderForm.js'
import { renderError } from './renderError.js';
import { getTodos, postTodos } from './api.js';
import { responseComment } from './responseComment.js';
import { Comments } from './renderComments.js'
import { changeFormButton, changeLikeButton } from './changeButtons.js';
import { login, registration, setToken } from "./api.js";

export let userName = '';
const nameInputElement = document.querySelector('.add-form-name');
const comment_box = document.querySelector('.create_comment');
const auth_box = document.querySelector('.auth');
const register_box = document.querySelector('.register');
const loginBtn = document.getElementById('login-btn');
const registrationhref = document.getElementById("registration-href");
const loginInputElement = document.getElementById('login-input');
const passwordInputElement = document.getElementById('password-input');
const regBtn = document.getElementById("reg-btn");
const athHref = document.getElementById('login-href');

function Authorization() {
    comment_box.style.display = "none";
    register_box.style.display = "none";
    auth_box.style.display = "flex";
    loginBtn.addEventListener('click', () => {

        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        })
            .then((responseData) => {
                setToken(responseData.user.token);
                userName = responseData.user.name;
            })
            .then(() => {
                comment_box.style.display = "flex";
                register_box.style.display = "none";
                auth_box.style.display = "none";
                nameInputElement.value = `${userName}`;
            })
    })

    
}
athHref.addEventListener('click',()=>{Authorization()});

registrationhref.addEventListener("click", () => {
    auth_box.style.display = "none";
    register_box.style.display = "flex";
    regBtn.addEventListener("click", () => {
        const nameRegElement = document.getElementById("nameReg-input");
        const loginRegElement =
            document.getElementById("loginReg-input");
        const passRegElement =
            document.getElementById("passwordReg-input");
        console.log(loginRegElement.value);
        registration({
            name: nameRegElement.value,
            login: loginRegElement.value,
            password: passRegElement.value,
        })
            .then((responseData) => {
                setToken(responseData.user.token);
                userName = responseData.user.name;
            })
            .then(() => {
                comment_box.style.display = "flex";
                register_box.style.display = "none";
                auth_box.style.display = "none";
                nameInputElement.value = `${userName}`;
            })
            .catch((error) => {
                if (error.message === "Пользователь с таким логином уже существует") {
                    alert("Пользователь с таким логином уже существует");
                }
            })
            ;
    });
});

let comments = [];
Authorization();
const addFormButton = document.getElementById("add-form-button");
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
            changeFormButton(false, '#bcec30', addFormButton);
            if (error.message === "Сервер сломался") {
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
    responseComment(textInputElement, comments);
};
renderComents();

// отправка комментария на сервер
addFormButton.addEventListener("click", () => {
    textInputElement.classList.remove("error");

    if (textInputElement.value === "") {
        textInputElement.classList.add("error");
    }

    renderForm('Комментарий добавляется', true)
    changeFormButton(true, 'grey', addFormButton);
    postTodos(textInputElement)
        .then(() => {
            getComments('Комментарий добавляется');
            renderError(false);
            textInputElement.value = '';
            renderComents();
        })
        .catch((error) => {
            renderForm(false);
            changeFormButton(false, '#bcec30', addFormButton);
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
