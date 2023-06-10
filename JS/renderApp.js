import { likeButtonsListeners } from "./likes.js";
import { isInitialLoading, isPosting } from "./api.js";
import { postToApi } from "./api.js";
import { getApp } from "./appHtml.js";
import { renderLoginComponent } from "./components/login-component.js";

export const appElement = document.getElementById('app');

// - Добавить авторизацию по логину и паролю! Пока авторизация происходит без каких-либо данных
// + Связать авторизацию с токеном, после аутентификации должна загружаться рабочая страница
// - Добавить форму регистрации и кнопку-toggle
// + Перенести рендер логина в отдельный модуль
// - В конце не забыть убрать все доп функции в отдельный модуль


export let token = null;  // Убрать/заменить!
// "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
let appHtml;


export const isInitialLoadingFunc = (loadElem) => {
    if (isInitialLoading) {
        loadElem.style.display = 'block';
    } else {
        loadElem.style.display = 'none';
    };
};


const renderApp = (data, elem, getList) => {

    const commentsHtml = data
        .map((comment, index) => getList(comment, index))
        .join('');


    if (!token) {
        renderLoginComponent({
            appHtml,
            appElement, 
            commentsHtml, 
            setToken: (newToken) => token = newToken,
        });
        return;
    };


    appHtml = getApp(commentsHtml);
    appElement.innerHTML = appHtml;

    const commentBtn = document.getElementById('form-add-button');
    const addName = document.getElementById('add-name');
    const addComment = document.getElementById('add-comment');
    const loadingComments = document.querySelector('.loading');
    const addFormElem = document.querySelector('.add-form');
    const commentAddedElem = document.querySelector('.comment-added');

    isInitialLoadingFunc(loadingComments);

    if (isPosting) {
        addFormElem.style.display = 'none';
        commentAddedElem.style.display = 'block';
    } else {
        addFormElem.style.display = 'block';
        commentAddedElem.style.display = 'none';
    };

    likeButtonsListeners();


    const addNewComment = () => {
        commentBtn.addEventListener("click", () => {
            addName.classList.remove("error");
            addComment.classList.remove("error");

            if (addName.value.trim() === '') {
                return addName.classList.add("error");
            } else if (addComment.value.trim() === '') {
                return addComment.classList.add("error");
            };


            renderApp(data, elem, getList);
            postToApi(data, addComment, addName);
        });
    };

    addNewComment();


    function checkInputs() {
        let isFilled = true;

        if (addName.value.trim() === '' || addComment.value.trim() === '') {
            isFilled = false;
        }

        if (isFilled) {
            commentBtn.disabled = false;
            commentBtn.classList.remove("hidden-button");
        } else {
            commentBtn.disabled = true;
            commentBtn.classList.add("hidden-button");
        }
    };


    const addNewCommentOnEnter = (event) => {
        if (event.keyCode === 13) {
            addName.classList.remove("error");
            addComment.classList.remove("error");

            if (addName.value.trim() === '') {
                return addName.classList.add("error");
            } else if (addComment.value.trim() === '') {
                return addComment.classList.add("error");
            } else {
                commentBtn.click();
            };
        };
    };


    addName.addEventListener('input', checkInputs);
    addName.addEventListener('keyup', addNewCommentOnEnter);
    addComment.addEventListener('input', checkInputs);
    addComment.addEventListener('keyup', addNewCommentOnEnter);

};


export { renderApp };