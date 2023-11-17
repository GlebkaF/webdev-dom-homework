"use strict";
const addFormButton = document.getElementById("add-form-button");
const nameInputElement = document.getElementById('add-form-name');
const textInputElement = document.getElementById('add-form-text');
const listCommentsElement = document.getElementById('comments-list');

let comments = [];
//получение коментариев гет-запрос на сервер
const getComments = () => {
    fetch('https://wedev-api.sky.pro/api/v1/olga-okulova/comments', {
        method: 'GET',
    })
        .then((response) => {
            return response.json()
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
            addFormButton.disabled = false;
            addFormButton.style.backgroundColor = '#bcec30';
        });
}

getComments();

//ответы на комннтарии
const responseСomment = () => {
    const formComments = document.querySelectorAll(".comment");
    for (const formComment of formComments) {
        formComment.addEventListener("click", () => {
            const index = formComment.dataset.index;
            nameInputElement.value = '';
            textInputElement.value = `> ${comments[index].name} : ${comments[index].text}`;
        });
    }
};

//кнопка лайка
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

//отображение коментариев
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
    responseСomment();
};

renderComents();

//отправка коментария на сервер
addFormButton.addEventListener("click", () => {
    nameInputElement.classList.remove("error");
    textInputElement.classList.remove("error");

    if (nameInputElement.value === "") {
        nameInputElement.classList.add("error");
        return;
    }

    if (textInputElement.value === "") {
        textInputElement.classList.add("error");
        return;
    }
    addFormButton.disabled = true;
    addFormButton.style.backgroundColor = 'grey';
    fetch("https://wedev-api.sky.pro/api/v1/olga-okulova/comments", {
        method: "POST",
        body: JSON.stringify({
            text: String(textInputElement.value)
                .replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
            name: String(nameInputElement.value)
                .replaceAll('<', `&lt;`)
                .replaceAll('>', `&gt;`)
        })
    })
        .then(() => {
            getComments();
        });

    renderComents();
    nameInputElement.value = "";
});

