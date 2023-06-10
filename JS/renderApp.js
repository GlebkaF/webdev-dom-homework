import { likeButtonsListeners } from "./likes.js";
import { isInitialLoading, isPosting } from "./api.js"; // ВЕРНУТЬ TOKEN!
import { getFromApi, postToApi } from "./api.js";
import { getApp, getAuthForm, getCommentsAndAuth } from "./appHtml.js";

export const appElement = document.getElementById('app');




let token = null;
// "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";


const renderApp = (data, elem, getList) => {
    let appHtml;

    const commentsHtml = data
        .map((comment, index) => getList(comment, index))
        .join('');


    const isInitialLoadingFunc = (loadElem) => {
        if (isInitialLoading) {
            loadElem.style.display = 'block';
        } else {
            loadElem.style.display = 'none';
        };
    };

    if (!token) {
        appHtml = getCommentsAndAuth(commentsHtml);
        appElement.innerHTML = appHtml;

        const loadingComments = document.querySelector('.loading');
        const authLink = document.getElementById('auth-link');

        isInitialLoadingFunc(loadingComments);

        authLink.addEventListener("click", () => {
            appHtml = getAuthForm();
            appElement.innerHTML = appHtml;

            const loginBtn = document.getElementById('login-button');

            // - Добавить авторизацию по логину и паролю! Пока авторизация происходит без каких-либо данных
            // + Связать авторизацию с токеном, после аутентификации должна загружаться рабочая страница
            // - Добавить форму регистрации и кнопку-toggle
            // - Обернуть (appHtml = функция вызова разметки(); appElement.innerHTML = appHtml;) в функцию
            // - В конце не забыть убрать все доп функции в отдельный модуль


            loginBtn.addEventListener("click", () => {
                // appHtml = getApp(commentsHtml);
                // appElement.innerHTML = appHtml;
                token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
                getFromApi(data);
            });
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