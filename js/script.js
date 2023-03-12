'use strict';

// Массив с данными о комментариях
const commentsListArray = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likeCount: 3,
        liked: false,
        isEdit: false,
        editButtonText: ['Редактировать', 'Сохранить'],
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        likeCount: 75,
        liked: true,
        isEdit: false,
        editButtonText: ['Редактировать', 'Сохранить'],
    },
];

// UL of comments
const commentsList = document.querySelector('ul.comments'); 

// Функция рисует HTML-разметку всех комментариев
function renderComments() {
    commentsList.innerHTML = commentsListArray.reduce((result, comment, index) => {
        return result + `
    <li class="comment">
        <div class="comment-header">
        <div>${comment.name}</div>
        <div>
            ${comment.date}
        </div >
        </div >
        <div class="comment-body">
        <div class="comment-text">
            ${comment.isEdit ? `<textarea type="textarea" class="add-form-text" rows="4" cols="49">${comment.text}</textarea>` : comment.text}
        </div>
        </div>
        <div class="comment-footer">
        <button class="edit-button">${comment.isEdit ? comment.editButtonText[1] : comment.editButtonText[0]} </button>
        <div class="likes">
            <span class="likes-counter">${comment.likeCount}</span>
            <button data-index="${index}"  class="${comment.liked ? 'like-button -active-like' : 'like-button'}"></button>
        </div>
        </div>
    </li >`
    }, '');

    addEventLike(); //кнопки лайк
    addEventEdit(); //редактирование
}
renderComments();

// Событие на лайк
function addEventLike() {
    const likeButtons = commentsList.querySelectorAll('button.like-button');
    for(let button of likeButtons){

        button.addEventListener('click', () => {
            const index = button.dataset.index;

            if (commentsListArray[index].liked === false) {
                commentsListArray[index].liked = true;
                commentsListArray[index].likeCount +=1;
            } else {
                commentsListArray[index].liked = false;
                commentsListArray[index].likeCount -=1;
            }

            renderComments();
        })
    }
}

// Событие на кнопку Редактировать
function addEventEdit() {
    const editButtons = commentsList.querySelectorAll('.edit-button');
    for(let button of editButtons) {
        button.addEventListener('click', (e) => {
            // Индекс беру из кнопки лайка-комментария
            // хотя лучше было бы прописать его в родительском li
            const index = button.parentNode.querySelector('.like-button').dataset.index;
            if (commentsListArray[index].isEdit === false){
            commentsListArray[index].isEdit = true;
            } else {
                // Нахожу ближайшую textarea
                let currentTextarea = e.currentTarget.closest('.comment').querySelector('textarea');
                if (currentTextarea.value !== '') {
                commentsListArray[index].isEdit = false;
                commentsListArray[index].text = currentTextarea.value;
                }
            }
            ;
            renderComments();
        })
    }
}

// Форма и её инпуты
const addForm = document.querySelector('div.add-form');
const inputName = document.querySelector('input.add-form-name');
const inputComment = document.querySelector('div.add-form > textarea.add-form-text');
const buttonAddComment = document.querySelector('button.add-form-button');

// Событие на кнопку добавить
buttonAddComment.addEventListener('click', addComment);

// Функция добавляет комментарий
function addComment() {
    const currentDate = new Date;
    const dateFormat = {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
    }
    const timeFormat = {
        hour: '2-digit',
        minute: '2-digit',
    }
    const currentDateString = currentDate.toLocaleDateString('ru-RU', dateFormat) +
    ' ' + currentDate.toLocaleTimeString('ru-RU', timeFormat);

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
        commentsListArray.push({
            name: inputName.value,
            date: currentDateString,
            text: inputComment.value,
            likeCount: 0,
            liked: false,
            isEdit: false,
            editButtonText: ['Редактировать', 'Сохранить'],
        })
        inputName.value = '';
        inputComment.value = '';
        renderComments(); // Заново отрисовываются все комментарии
    }
}

// Отправка комментария при нажатии Enter
addForm.addEventListener('keyup', (e) => {
if (e.code == 'Enter') addComment();
});

// console.log("It works! К моему большому удивлению!");