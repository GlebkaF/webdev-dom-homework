"use strict";

let isLoading = false;
const loadingComm = document.querySelector('.loading-comments');
const errorMass = document.querySelector('.error-comments');
const addForm = document.querySelector('.add-form');

const renderForm = (message, isLoading) => {
    if (isLoading === true) {
        loadingComm.innerHTML = message;
        loadingComm.style.display = 'flex';
        addForm.style.display = 'none';
    } else {
        loadingComm.style.display = 'none';
        addForm.style.display = 'flex';
    }
}

const renderError = (message, isError) => {
    if (isError === true) {
        errorMass.innerHTML = message;
        errorMass.style.display = 'block';
    } else {
        errorMass.style.display = 'none';
        errorMass.innerHTML = message;
    }
}

let comments = [];
const listCommentsElement = document.getElementById('comments-list');
const addFormButton = document.getElementById("add-form-button");
const nameInputElement = document.getElementById('add-form-name');
const textInputElement = document.getElementById('add-form-text');

// получение комментариев гет-запрос на сервер
const getComments = (message) => {
    renderForm(message, true);
    fetch('https://wedev-api.sky.pro/api/v1/olga-okulova/comments', {
        method: 'GET',
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался');
            }
            return response.json();
        })
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
            changeFormButton(false, '#bcec30')
            renderForm('', false);
            renderError(false);
        })
        .catch((error) => {
            renderForm(false);
            changeFormButton(false, '#bcec30');
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

// функция изменения состояния кнопки
const changeFormButton = (isDisabled, color) => {
    addFormButton.disabled = isDisabled;
    addFormButton.style.backgroundColor = color;
}

// ответы на комментарии
const responseComment = () => {
    const formComments = document.querySelectorAll(".comment");
    for (const formComment of formComments) {
        formComment.addEventListener("click", () => {
            const index = formComment.dataset.index;
            nameInputElement.value = '';
            textInputElement.value = `> ${comments[index].name} : ${comments[index].text}`;
        });
    }
};

// кнопка лайка
const likeButtonListeners = () => {
    const likeElements = document.querySelectorAll(".like-button");
    for (const likeElement of likeElements) {
        likeElement.addEventListener("click", (event) => {
            event.stopPropagation();
            if (comments[likeElement.dataset.index].isLiked === true) {
                comments[likeElement.dataset.index].likesCount -= 1;
                comments[likeElement.dataset.index].isLiked = false;
            } else if (comments[likeElement.dataset.index].isLiked === false) {
                comments[likeElement.dataset.index].likesCount += 1;
                comments[likeElement.dataset.index].isLiked = true;
            }
            renderComents();
        });
    }
};

// отображение комментариев
const renderComents = () => {
    const commentsHtml = comments
        .map((comment, index) => {
            return `<li data-index="${index}" class="comment">
        <div class="comment-header}">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesCount}</span>
            <button data-index="${index}" class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
          </div>
        </div>
      </li>`;
        })
        .join("");

    listCommentsElement.innerHTML = commentsHtml;
    likeButtonListeners();
    responseComment();
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
    changeFormButton(true, 'grey');

    fetch("https://wedev-api.sky.pro/api/v1/olga-okulova/comments", {
        method: "POST",
        body: JSON.stringify({
            text: String(textInputElement.value)
                .replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
            name: String(nameInputElement.value)
                .replaceAll('<', `&lt;`)
                .replaceAll('>', `&gt;`),
            forceError: false
        })
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался')
            };
            if (response.status === 400) {
                throw new Error('Ошибка запроса');
            };
            return response.json();
        })
        .then(() => {
            getComments('Комментарий добавляется');
            renderError(false);
            nameInputElement.value = '';
            textInputElement.value = '';
            renderComents();
        })
        .catch((error) => {
            renderForm(false);
            changeFormButton(false, '#bcec30');
            if (error.message === "Ошибка запроса") {
                // Выводим сообщение только при ошибке запроса
                renderError('Имя и комментарий должны быть не короче 3 символов', true);
                return;
            }
            if (error.message === "Сервер сломался") {
                renderError(error.message, true);
                return;
            } else {
                // Выводим сообщение только при других ошибках
                renderError('Кажется, у вас сломался интернет, попробуйте позже', true);
                return;
            }
        });
});
