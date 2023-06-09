import { likeButtonsListeners } from "./likes.js";
import { isInitialLoading, isPosting } from "./api.js";
import { postToApi } from "./api.js";

const appElement = document.getElementById('app');


const renderApp = (data, elem, getList) => {

    const commentsHtml = data
        .map((comment, index) => getList(comment, index))
        .join('');

    const appHtml = `
                <div class="container">
                    <div class="comment">
                        <h2>Форма входа</h2>
                        <input type="text" class="add-form-name signin-form" id="login-input" placeholder="Введите логин" /><br>
                        <input type="password" class="add-form-name signin-form" id="password-input" placeholder="Введите пароль" /><br>
                        <button class="add-form-button signin-button" id="login-button">Войти</button><br><br><br>
                        <a href="#" class="link">Зарегистрироваться</a>
                    </div>
                </div>
                <div class="container">
                    <div class="loading" style="display: none;">Комментарии загружаются...</div>
                    <ul class="comments" id="list-comments">
                    ${commentsHtml}
                    </ul>
                    <div class="add-form">
                        <input type="text" class="add-form-name" id="add-name" placeholder="Введите ваше имя" />
                        <textarea type="textarea" class="add-form-text" id="add-comment" placeholder="Введите ваш коментарий"
                            rows="4"></textarea>
                        <div class="add-form-row">
                            <button class="add-form-button" id="form-add-button">Написать</button>
                        </div>
                    </div>
                    <div class="comment-added" style="display: none;">Комментарий добавляется...</div>
                </div>`;



    appElement.innerHTML = appHtml;


    const commentBtn = document.getElementById('form-add-button');
    const addName = document.getElementById('add-name');
    const addComment = document.getElementById('add-comment');
    const loadingComments = document.querySelector('.loading');
    const addFormElem = document.querySelector('.add-form');
    const commentAddedElem = document.querySelector('.comment-added');

    if (isInitialLoading) {
        loadingComments.style.display = 'block';
    } else {
        loadingComments.style.display = 'none';
    };

    if (isPosting) {
        addFormElem.style.display = 'none';
        commentAddedElem.style.display = 'block';
    } else {
        addFormElem.style.display = 'block';
        commentAddedElem.style.display = 'none';
    }

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