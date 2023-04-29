"use strict";

const addFormButton = document.querySelector(".add-form-button");
const addFormName = document.querySelector(".add-form-name");
const addFormText = document.querySelector(".add-form-text");
const commentsList = document.querySelector(".comments");


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


//рендер комментариев 
function renderComments(comments) {
    // очищаем список комментариев перед добавлением новых
    commentsList.innerHTML = '';

    // создаем новый массив с разметкой комментариев
    const commentItems = comments
        .map(comment => `
      <li class="comment">
        <div class="comment-header">
          <div>${comment.author}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${comment.text}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button"></button>
          </div>
        </div>
      </li>`
        );

    const commentsHTML = commentItems
        .join('');

    // добавляем новый список комментариев на страницу
    commentsList.insertAdjacentHTML('beforeend', commentsHTML);
}

renderComments(comments);


//добавляем новый комментарий в массив
function addComment() {
    // получаем значения из формы ввода (тут же ставим защиту от XSS)
    const author = addFormName.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
    const text = addFormText.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
    const date = new Date().toLocaleString();
    const likes = 0;

    // создаём новый объект комментария, чтобы добавить его в уже существующий
    const newComment = {
        author,
        text,
        date,
        likes,
    };

    comments.push(newComment);

    renderComments(comments);
}


// находим элементы формы и список комментариев
const form = document.querySelector(".add-form");

addFormButton.addEventListener("click", (event) => { // находим кнопку "Написать", добавляем новый комментарий
    event.preventDefault();

    const name = addFormName.value.trim();
    const text = addFormText.value.trim();

    if (!name || !text) {
        alert("Необходимо указать имя и комментарий!");
        return;
    }

    const date = new Date().toLocaleString();

    addComment()

    addFormName.value = "";
    addFormText.value = "";
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

validateForm();


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


//отвечаем на комментарии

const commentItems = document.querySelectorAll('.comment'); //получаем комменты на которые нужен ответ (все из документа)

// для каждого коммента добавляем событие клика
commentItems.forEach(comment => {
    comment.addEventListener('click', () => {
        // получаем автора и текст комментария
        const author = comment.querySelector('.comment-header div:first-child').textContent;
        const text = comment.querySelector('.comment-text').textContent;

        addFormText.value = `@${author} \n\n > ${text}, `;
        addFormText.focus();

    });
});