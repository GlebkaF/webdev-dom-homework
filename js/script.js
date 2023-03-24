'use strict';


// За неимением кнута его долго били пряником...


// Заглушка при загрузке комментариев с сервера
const commentsList = document.querySelector('ul.comments');
let comments = [{
    date: getDate(new Date),
    isLiked: false,
    likes: 1000,
    text: "Комментарии загружаются........",
    author: { name: '' }
}
];
renderComments();

// Достаю комментарии с сервера
function getComments() {
    fetch('https://webdev-hw-api.vercel.app/api/v1/alex-volo/comments', {
        method: "GET"
    }).then((response) =>
        response.json().then((responseData) => {
            comments = responseData.comments;
            renderComments()
        }));
}
getComments();

// Форма
const addForm = document.querySelector('div.add-form');

// Массив с данными о комментариях
// Пока оставляю, чтобы не лезли ошибки
const commentsListArray = [];

// Функция преобразует дату из строки используется в рендер функции
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

    commentsList.innerHTML = comments.reduce((result, comment, index) => {
        return result + `
    <li class="comment" data-id="${comment.id}" data-index="${index}">
        <div class="comment-header">
        <div>${comment.author.name}
        </div>
        <div>${getDate(comment.date)}
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
            <button class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
        </div>
        </div>
    </li >`
    }, '');

    addListenerOnComments();
}

// Рендер формы добавления комментария
let isLoading = false; //Загружается ли комментарий на сервер

function renderForm() {
    if (!isLoading) {
        addForm.innerHTML = `    
    <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="input-name" />
    <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
      id="input-comment"></textarea>
    <div class="add-form-row">
      <button class="add-form-button" id="button-add-comment">Написать</button>
    </div>`;
        // Добавляю событие на клик по добавить комментарий
        const buttonAddComment = document.querySelector('button.add-form-button');
        buttonAddComment.addEventListener('click', addComment);
    } else {
        addForm.innerHTML = `    
        Комментарий добавляется...
        <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
        `
    }


}
renderForm();

// Делегирую события для комментариев на один обработчик
function addListenerOnComments() {
    const currentComments = document.querySelectorAll('li.comment');

    for (const comment of currentComments) {
        comment.addEventListener('click', (e) => {
            const index = comment.dataset.index;
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



// Функция добавляет комментарий
function addComment() {
    const inputName = document.querySelector('input.add-form-name');
    const inputComment = document.querySelector('div.add-form > textarea.add-form-text');
    const currentDate = new Date;

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
        // Заглушка на время отправки коммента на сервер
        isLoading = true;
        renderForm();

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
                isLoading = false;
                renderForm();
            })
        });
        inputName.value = '';
        inputComment.value = '';
    }
}
