'use strict';

// Достаем комментарии с сервера
function getComments(){
fetch('https://webdev-hw-api.vercel.app/api/v1/alex-volo/comments', {
    method: "GET"
}).then((response) => 
response.json().then((responseData) => {
    comments = responseData.comments;
    renderComments()
}));
}
getComments();

// Форма и её инпуты
const addForm = document.querySelector('div.add-form');
const inputName = document.querySelector('input.add-form-name');
const inputComment = document.querySelector('div.add-form > textarea.add-form-text');
const buttonAddComment = document.querySelector('button.add-form-button');
// UL 
const commentsList = document.querySelector('ul.comments');

// Массив с данными о комментариях
const commentsListArray = [];
let comments = [];

// Функция преобразует дату из строки
// Работает, но мне не нравится как написана 
function getDate(date) {
    const options = {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }
    const newDate = new Date(date);
    return newDate.toLocaleString('ru-RU', options).replace(',', '');
}

// Функция рисует HTML-разметку всех комментариев
function renderComments() {
    commentsList.innerHTML = comments.reduce((result, comment) => {
        return result + `
    <li class="comment" data-id="${comment.id}">
        <div class="comment-header">
        <div>${comment.author.name}</div>
        <div>
            ${getDate(comment.date)}
        </div >
        </div >
        <div class="comment-body">
        <div class="comment-text">
            
            ${comment.text}
            
        </div>
        </div>
        <div class="comment-footer">
        <button class="delete-button">Удалить</button>
        <button class="edit-button">Редактировать </button>
        <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index="${comment.id}"  class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
        </div>
        </div>
    </li >`
    }, '');

    addListenerOnComments();
}


// Попробуем делегировать события и повешать один обработчик
// На комментарий
function addListenerOnComments() {
    const currentComments = document.querySelectorAll('li.comment');

    for (const comment of currentComments) {
        comment.addEventListener('click', (e) => {
            const index = comment.dataset.id;
            const likeButton = e.currentTarget.querySelector('button.like-button');
            const editButton = e.currentTarget.querySelector('.edit-button');
            const deleteButton = e.currentTarget.querySelector('.delete-button');
            const editTextarea = e.currentTarget.querySelector('textarea');

            if (e.target === editTextarea) { return }
            if (e.target === likeButton) { like(index); return; }
            if (e.target === editButton) { edit(index); return; }
            if (e.target === deleteButton) { deleteComment(index); return }

            replyComment(index);
        })
    }
}

// Функция делает цитаты
function makeQuote(str) {
    return str.replaceAll('QUOTE_BEGIN', '<blockquote class="blockquote">')
        .replaceAll('QUOTE_END', '</blockquote>');
}

// Функция обезопасить пользовательский ввод
function safeInput(str) {
    return str.replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

// Функция ответить на комментарий
function replyComment(index) {
    inputComment.value = 'QUOTE_BEGIN >' + comments[index].text +
        '\n' + comments[index].name + '< QUOTE_END';
    renderComments();
}

// Функция удалить комментарий
function deleteComment(index) {
    comments.splice(index, 1);
    renderComments();
}

// Функция лайк
function like(index) {
    if (comments[index].isLiked === false) {
        comments[index].isLiked = true;
        comments[index].likes += 1;
    } else {
        comments[index].isLiked = false;
        comments[index].likes -= 1;
    }

    renderComments();
}

// Функциия редактировать
function edit(index) {

    if (commentsListArray[index].isEdit === false) {
        commentsListArray[index].isEdit = true;
    } else {
        // Нахожу textarea
        let currentTextarea = commentsList.querySelectorAll('.comment')[index].querySelector('textarea');

        if (currentTextarea.value !== '') {
            commentsListArray[index].isEdit = false;
            commentsListArray[index].text = safeInput(currentTextarea.value);
        }
    }

    renderComments();
}

// Добавить комментарий при нажатии Enter
addForm.addEventListener('keyup', (e) => {
    if (e.code == 'Enter') addComment();
});

// Событие на кнопку добавить комментарий
buttonAddComment.addEventListener('click', addComment);

// Функция добавляет комментарий
function addComment() {
    const currentDate = new Date;
    const currentDateString = getDate(currentDate)

    // Таймаут красного фона на полях
    function clearInputName() {
        inputName.classList.remove('error__name')
        inputName.placeholder = 'Введите ваше имя';
    }
    function clearInputComment() {
        inputComment.classList.remove('error__name')
        inputComment.placeholder = 'Введите ваш комментарий';
    }


    if (inputName.value === '') {
        inputName.classList.add('error__name');
        inputName.placeholder = 'Поле не может быть пустым!';
        inputName.value = '';
        inputComment.value = '';
        setTimeout(clearInputName, 1500);

    } else if (inputComment.value === '' || inputComment.value === '\n') {
        inputComment.classList.add('error__name');
        inputComment.placeholder = 'Поле не может быть пустым!';
        inputComment.value = '';
        setTimeout(clearInputComment, 1500);

    } else {
        fetch('https://webdev-hw-api.vercel.app/api/v1/alex-volo/comments', {
            method: "POST",
            body: JSON.stringify({
                date: currentDate,
                likes: 0,
                isLiked: false,
                text: safeInput(inputComment.value),
                name: safeInput(inputName.value),
        })
        }).then((response) => {
            getComments();
        response.json().then((responseData) => {
            console.log(responseData);
        })
    });
        inputName.value = '';
        inputComment.value = '';
    }
}

console.log("It works! К моему большому удивлению!");