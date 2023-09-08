import { postComments } from "./api.js";
import { initLikesButtonListeners, initEditButtonListeners, initEditCommentListeners } from "./main.js";



export const renderComments = ({ comments, fetchAndRenderComments }) => {
    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment" data-text="${comment.text}" data-name="${comment.name}" data-index="${index}"">
      <div class="comment-header">
        <div> ${comment.name} </div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        ${comment.isEdit ? `<textarea class="edit-text" id="textarea-${index}">${comment.text}</textarea>` : `<div class="comment-text">
          ${comment.text}
        </div>`}
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.like}</span>
          <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
        </div>
      </div>
      <div class="add-form-row">
      <button class="add-form-button edit-comment" data-index="${index}">${comment.isEdit ? 'Сохранить' : 'Редактировать'} </button>
    </div>
    </li>`
    }).join(' ');

    const appElement = document.getElementById("app");

    const appHTML = `
<div class="container">
<div id="container-preloader"></div>

<ul id="list" class="comments">

    <!-- Список рендерится из JS -->
    ${commentsHtml}

</ul>

<div id="container-preloader-post">Пожалуйста подождите, загружаю комментарии...</div>

<div class="add-form">
    <input type="text" id="name-input" class="add-form-name" placeholder="Введите ваше имя" />
    <textarea type="textarea" id="comment-input" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
    <div class="add-form-row">
        <button id="add-comment" class="add-form-button">Написать</button>
    </div>
</div>
<div class="add-form-row">
    <button id="del-comment" class="add-form-button">Удалить последний комментарий</button>
</div>
</div>
`;


    appElement.innerHTML = appHTML;

    //        ОБЪЯВЛЕНИЕ ВСЕХ CONST
    const buttonAddElement = document.getElementById("add-comment");
    const listElement = document.getElementById("list");
    const nameInputElement = document.getElementById("name-input");
    const commentInputElement = document.getElementById("comment-input");
    const buttonDelComment = document.getElementById("del-comment");
    const addFormElement = document.querySelector('.add-form');


    // const myDate = new Date().toLocaleDateString().slice(0, 6) + new Date().toLocaleDateString().slice(-2);
    // const nowDate = myDate + ' ' + new Date().toLocaleTimeString().slice(0, -3);

    const containerPreloader = document.getElementById('container-preloader');
    const containerPreloaderPost = document.getElementById('container-preloader-post');


    initLikesButtonListeners();
    initEditButtonListeners();
    initEditCommentListeners();
    btnElementInit(buttonAddElement, commentInputElement, nameInputElement, addFormElement, fetchAndRenderComments);
}


// HOMEWORK 2.9

//        ПРОВЕРКА НА ЗАПОЛНЕНИЕ ФОРМ + НЕАКТИВНАЯ КНОПКА


function btnElementInit(buttonAddElement, commentInputElement, nameInputElement, addFormElement, fetchAndRenderComments) {

    buttonAddElement.addEventListener('click', () => {

        nameInputElement.classList.remove("error");
        commentInputElement.classList.remove("error");
        buttonAddElement.removeAttribute('disabled', 'disabled');

        if (commentInputElement.value === '' || nameInputElement.value === '') {
            buttonAddElement.setAttribute('disabled', 'disabled');


            if (commentInputElement.value === '' && nameInputElement.value === '') {
                commentInputElement.classList.add("error");
                nameInputElement.classList.add("error");
                return;
            } if (nameInputElement.value === '') {
                nameInputElement.classList.add("error");
                buttonAddElement.setAttribute('disabled', '');
                return;
            } else {
                commentInputElement.classList.add("error");
                return;
            }
        }

        addFormElement.classList.add('form-none');

        buttonAddElement.disabled = true;
        buttonAddElement.textContent = 'Комментарий добавляется..';


        const fetchPromise = () => {
            // containerPreloaderPost.textContent = 'Добавляется комментарий...';

            postComments({
                name: nameInputElement.value,
                text: commentInputElement.value,
            })
                .then((response) => {
                    if (response.status === 400) {
                        throw new Error('Неверный запрос')
                    }
                    if (response.status === 500) {
                        throw new Error('Ошибка сервера')
                    }
                    if (response.status === 201) {
                        return response.json();
                    }

                })
                .then((responseData) => {
                    return fetchAndRenderComments();
                })
                .then((data) => {
                    // containerPreloaderPost.textContent = '';
                    addFormElement.classList.remove('form-none');
                    nameInputElement.value = '';
                    commentInputElement.value = '';
                })
                .catch((error) => {

                    // containerPreloaderPost.textContent = '';
                    addFormElement.classList.remove('form-none');

                    // console.warn(error);

                    if (error.message === "Неверный запрос") {
                        alert('Короткое имя или текст комментария, минимум 3 символа');
                    }
                    else if (error.message === "Ошибка сервера") {
                        alert('Сломался сервер , попробуйте позже');
                        fetchPromise();
                    }
                    else  {
                        // (window.navigator.onLine === false)
                        // alert('Проблемы с интернетом, проверьте подключение');
                        console.error(error);
                    }
                })
        }

        fetchPromise();
    })
}

