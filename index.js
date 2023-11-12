"use strict";
const addFormButton = document.getElementById("add-form-button");
const nameInputElement = document.getElementById('add-form-name');
const textInputElement = document.getElementById('add-form-text');
const listCommentsElement = document.getElementById('comments-list');

const comments = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likesCount: 3,
        isLiked: false
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        likesCount: 75,
        isLiked: true
    }
]

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

const likeButtonListeners = () => {
    const likeElements = document.querySelectorAll(".like-button");
    for (const likeElement of likeElements) {
        likeElement.addEventListener("click", (event) => {
            event.stopPropagation();
            if (comments[likeElement.dataset.index].isLiked === true) {
                console.log('gpgpggp');
                comments[likeElement.dataset.index].likesCount -= 1;
                comments[likeElement.dataset.index].isLiked = false;
            }
            else if (comments[likeElement.dataset.index].isLiked === false) {
                comments[likeElement.dataset.index].likesCount += 1;
                comments[likeElement.dataset.index].isLiked = true;
            }
            renderComents();

        });
    }
};

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

    comments.push({
        name: String(nameInputElement.value)
            .replaceAll('<', `&lt;`)
            .replaceAll('>', `&gt;`),
        date: new Date().toLocaleString(),
        text: String(textInputElement.value)
            .replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        likesCount: 0,
        isLiked: false
    });
    renderComents();
    nameInputElement.value = "";
});

console.log("It works!");