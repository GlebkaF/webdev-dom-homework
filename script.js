"use strict";

const addFormButton = document.querySelector(".add-form-button");
const addFormName = document.querySelector(".add-form-name");
const addFormText = document.querySelector(".add-form-text");
const commentsList = document.querySelector(".comments");


//рендер комментариев

const comments = [ //ммассив с комментариями 
    {
      author: 'Глеб Фокин',
      date: '12.02.22 12:18',
      text: 'Это будет первый комментарий на этой странице',
      likes: 3
    },
    {
      author: 'Варвара Н.',
      date: '13.02.22 19:22',
      text: 'Мне нравится как оформлена эта страница! ❤',
      likes: 74
    },
    // ...
  ];
  

function renderComments(comments) {
    const commentsList = document.querySelector('.comments');

    //оичщаем список комментариев перед добавлением новых
    commentsList.innerHTML = '';

    //проходим по каждому комментарию и добавляем его в список
    comments.forEach(comment => {
        const commentItem = document.createElement('li');
        commentItem.classList.add('comment');

        const commentHeader = document.createElement('div');
        commentHeader.classList.add('comment-header');

        const commentAuthor = document.createElement('div');
        commentAuthor.textContent = comment.author;
        commentHeader.appendChild(commentAuthor);

        const commentDate = document.createElement('div');
        commentDate.textContent = comment.date;
        commentHeader.appendChild(commentDate);

        const commentBody = document.createElement('div');
        commentBody.classList.add('comment-body');

        const commentText = document.createElement('div');
        commentText.classList.add('comment-text');
        commentText.textContent = comment.text;
        commentBody.appendChild(commentText);

        const commentFooter = document.createElement('div');
        commentFooter.classList.add('comment-footer');

        const likesContainer = document.createElement('div');
        likesContainer.classList.add('likes');

        const likesCounter = document.createElement('span');
        likesCounter.classList.add('likes-counter');
        likesCounter.textContent = comment.likes;
        likesContainer.appendChild(likesCounter);

        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likesContainer.appendChild(likeButton);

        commentFooter.appendChild(likesContainer);

        commentItem.appendChild(commentHeader);
        commentItem.appendChild(commentBody);
        commentItem.appendChild(commentFooter);

        commentsList.appendChild(commentItem);
    });
}

renderComments(comments);

// находим элементы формы и список комментариев
const form = document.querySelector(".add-form");

// находим кнопку "Написать" и добавляем обработчик на клик
const addButton = document.querySelector(".add-form-button");
addButton.addEventListener("click", (event) => {

    // получаем значения полей ввода
    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    // проверяем поля на валидность
    if (!name || !text) {
        alert("Необходимо указать имя и комментарий!");
        return;
    }

    // создаем элементы комментария
    const commentItem = document.createElement("li");
    commentItem.classList.add("comment");

    const commentHeader = document.createElement("div");
    commentHeader.classList.add("comment-header");

    const author = document.createElement("div");
    author.textContent = name;
    commentHeader.appendChild(author);

    const date = document.createElement("div");
    date.textContent = new Date().toLocaleString();
    commentHeader.appendChild(date);

    const commentBody = document.createElement("div");
    commentBody.classList.add("comment-body");

    const commentText = document.createElement("div");
    commentText.classList.add("comment-text");
    commentText.textContent = text;
    commentBody.appendChild(commentText);

    const commentFooter = document.createElement("div");
    commentFooter.classList.add("comment-footer");

    const likes = document.createElement("div");
    likes.classList.add("likes");

    const likesCounter = document.createElement("span");
    likesCounter.classList.add("likes-counter");
    likesCounter.textContent = 0;
    likes.appendChild(likesCounter);

    const likeButton = document.createElement("button");
    likeButton.classList.add("like-button");
    likes.appendChild(likeButton);

    commentFooter.appendChild(likes);

    // дбавляем элементы в DOM
    commentItem.appendChild(commentHeader);
    commentItem.appendChild(commentBody);
    commentItem.appendChild(commentFooter);
    commentsList.appendChild(commentItem);

    // очищаем поля ввода
    nameInput.value = "";
    textInput.value = "";
});


// disabled
const nameInput = document.querySelector('.add-form-name');
const textInput = document.querySelector('.add-form-text');
const submitButton = document.querySelector('.add-form-button');

function handleInput() {
    const nameValue = nameInput.value.trim();
    const textValue = textInput.value.trim();

    if (nameValue !== '' && textValue !== '') {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove('disabled');
    } else {
        submitButton.setAttribute('disabled', true);
        submitButton.classList.add('disabled');
    }
}

nameInput.addEventListener('input', handleInput); // проверка заполнености двух полей
textInput.addEventListener('input', handleInput);

// разблокирует кнопку, если поля не пустые
function validateForm() {
    const nameValue = addFormName.value.trim();
    const textValue = addFormText.value.trim();
    const isValid = nameValue !== "" && textValue !== "";
    addFormButton.disabled = !isValid;
    addFormButton.classList.toggle("disabled", !isValid);
}

// получает данные вставленных комментариев и удаляет последний 
const removeLastCommentButton = document.querySelector(".remove-last-comment-button");
function removeLastComment() {
    const comments = commentsList.querySelectorAll(".comment");
    if (comments.length > 0) {
        comments[comments.length - 1].remove();
    }
}

removeLastCommentButton.addEventListener("click", removeLastComment);

// нажатие enter 
addFormText.addEventListener("keyup", function (event) {
    if (event.key === "Enter" && !addFormButton.disabled) {
        addFormButton.click();
    }
});

//кнопка лайка
const commentsContainer = document.querySelector('ul.comments');

//добавляем обработчик лайка
commentsContainer.addEventListener('click', function (event) {
    //проверяем, что кликнули по кнопке лайка
    if (event.target.classList.contains('like-button')) {
        const likeButton = event.target;
        const likesCounter = likeButton.previousElementSibling; //находим счетчик лайков
        let likesCount = parseInt(likesCounter.textContent); //получаем текущее количество лайков

        if (likeButton.classList.contains('-active-like')) {
            //убираем лайк
            likesCount--;
            likesCounter.textContent = likesCount;
            likeButton.classList.remove('-active-like');
        } else {
            //ставим лайк
            likesCount++;
            likesCounter.textContent = likesCount;
            likeButton.classList.add('-active-like');
        }
    }
});

