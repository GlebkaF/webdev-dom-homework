import { likeButtonsListeners } from "./likes.js";
import { isInitialLoading, isPosting, token } from "./api.js";
import { postToApi } from "./api.js";
import { getApp, getAuthForm, getCommentsAndAuth } from "./appHtml.js";

export const appElement = document.getElementById('app');


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
        });

    } else {
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
};


export { renderApp };