"use strict";
//Поиск всех элементов
const addButtonElement = document.querySelector('.add-form-button');
const commentsElement = document.querySelector('.comments');
const nameInputValue = document.querySelector('.add-form-name');
const textareaValue = document.querySelector('.add-form-text');
const formElement = document.querySelector('.add-form');
let dateValue = document.querySelector('.time');
const removeButtonElement = document.querySelector('.remove-button')
const commentElement = document.querySelectorAll('.comment');
//Работа с кнопкой
addButtonElement.disabled = true;
addButtonElement.classList.add('btnNoActive');

//Колбэк функция для активации кнопки
function isActive() {
    addButtonElement.disabled = false;
    addButtonElement.classList.remove('btnNoActive');
}

//Отслеживает инпуты
nameInputValue.addEventListener('input', isActive);
textareaValue.addEventListener('input', isActive);

//Колбэк функция для добавления комментариев
function addComments() {
    //Сохранение предыдущих комментариев
    const oldItemElement = commentsElement.innerHTML;
    //Создание даты
    dateValue = new Date();
    const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    let day = dateValue.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let year = dateValue.getFullYear().toString().slice(-2);
    //Удаление классов у текстовых полей
    nameInputValue.classList.remove('error');
    textareaValue.classList.remove('error');
    //Валидация полей
    if (nameInputValue.value === '' && textareaValue.value === '') {
        nameInputValue.classList.add('error');
        textareaValue.classList.add('error');
        return;
    } else if (nameInputValue.value === '') {
        nameInputValue.classList.add('error');
        return;
    } else if (textareaValue.value === '') {
        textareaValue.classList.add('error');
        return;
    }
    //Добавление нового комментария
    commentsElement.innerHTML = oldItemElement + `<li class="comment">
    <div class="comment-header">
      <div>${nameInputValue.value}</div>
      <div class="time">${day}.${month[dateValue.getMonth()]}.${year} ${dateValue.getHours()}:${dateValue.getMinutes()}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${textareaValue.value}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">0</span>
        <button class="like-button"></button>
      </div>
    </div>
  </li>`
    //Очищение полей после добавления комментария
    textareaValue.value = '';
    nameInputValue.value = '';
}
//Добавление комментарий по клику
addButtonElement.addEventListener('click', addComments)
//Добавление комментария по нажатию Энтер
formElement.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        addComments();
    }
})

//Удаление
removeButtonElement.addEventListener('click', () => {
    let lastEl;
    commentElement.forEach(element => {
        lastEl = element;
    });
    lastEl.remove();
})
