"use strict";
import { getCommentsApi, addCommentApi} from './api.js';
import { renderCommentsModule, renderFormModule } from './render.js';
import { likeBtn, initUpdateCommentListener } from "./actionsWithComments.js";
let isLoading = false;

document.querySelector('.add-form').style.display = "none";

//Нашла форму добавления комментариев
const formAddComm = document.querySelector('.add-form');

//рендер формы для написания комментария
const renderForm = () => {
  renderFormModule({ formAddComm, isLoading });
  addCommentsListener();
  isActive();
}
renderForm();

function isActive() {
  const writeButton = document.querySelector('.add-form-button');
  writeButton.disabled = true;
  writeButton.style.backgroundColor = 'grey';

  document.querySelector('.add-form-name').addEventListener('input', () => {
    if (document.querySelector('.add-form-name').value.trim() !== '' && document.querySelector('.add-form-text').value.trim() !== '') {
      writeButton.disabled = false;
      writeButton.style.backgroundColor = '#bcec30';
    }
  });
  document.querySelector('.add-form-text').addEventListener('input', () => {
    if (document.querySelector('.add-form-name').value.trim() !== '' && document.querySelector('.add-form-text').value.trim() !== '') {
      writeButton.disabled = false;
      writeButton.style.backgroundColor = '#bcec30';
    }
  });
}

//Нашла блок с комментариями и сами комментарии

//Нашла кнопку удаления
const deleteButton = document.querySelector('.remove-button');

//массив с комментариями
let comments = [];
//Отслеживает лайки
const initLikeButtonsListener = () => {
  //Нашла кнопку лайка
  const likeButtons = document.querySelectorAll('.like-button');
  //Перебираю все кнопки 
  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      //функция для проверки на состояние загрузки и присваивание класса с анимацией
      likeBtn({ likeButton, comments })
        .then(() => {
          return renderComments();
        });
    });
  }
}

//Изменение комментария
const initUpdateButtonsListener = () => {
  const updateButtons = document.querySelectorAll('.update-btn');
  for (const updateButton of updateButtons) {
    updateButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const index = updateButton.dataset.index;
      comments[index].isEdit = true;
      renderComments();
    })
  }
}

//Сохранение измененного комментария
const initSaveButtonsListeners = () => {
  const saveButtons = document.querySelectorAll('.save-btn');
  const updateInputValue = document.querySelector('.update-input');
  for (const saveButton of saveButtons) {
    saveButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const index = saveButton.dataset.index;
      comments[index].textComment = updateInputValue.value;
      comments[index].isEdit = false;
      renderComments();
    })
  }
}

//Рендерит комментарии
const renderComments = () => {
  renderCommentsModule({ comments });
  initLikeButtonsListener();
  initUpdateButtonsListener();
  initSaveButtonsListeners();
  initUpdateCommentListener({ comments });
}
renderComments();


//Получение комментариев из Апи
const getComments = () => {
  getCommentsApi().then((responseData) => {
    comments = responseData.comments;
    return renderComments();
  })
}
getComments();


//Добавляет обработчик на кнопку Написать
function addCommentsListener() {
  document.querySelector('.add-form-button')
    .addEventListener('click', addComments)
}

//Функция добавления комментария
function addComments() {
  //Нашла два инпута
  const nameInputElement = document.querySelector('.add-form-name');
  const commentInputElement = document.querySelector('.add-form-text');
  isLoading = true;
  renderForm();
  getComments();

  //Добавление в массив новые комменатарии
  addCommentApi({ text: commentInputElement.value, name: nameInputElement.value }).then((responseData) => {
    comments = responseData.comments;
    return getComments();
  })
    .then((data) => {
      nameInputElement.value = '';
      commentInputElement.value = '';
      nameElementError = nameInputElement.value;
      commentElementError = commentInputElement.value;
      isLoading = false;
      renderForm();
    })
    .catch((error) => {
      if (error.message === "Сервер сломался") {
        console.log(error.message);
        nameElementError = nameInputElement.value;
        commentElementError = commentInputElement.value;
        // alert("Сервер сломался. Повторите позже.");
        isLoading = false;
        renderForm();

        addComments();
        return;
      }
      if (error.message === "Плохой запрос") {
        console.log(error.message);
        nameElementError = nameInputElement.value;
        commentElementError = commentInputElement.value;
        alert('Имя и комментарий должны быть не короче 3 символов')
        isLoading = false;
        renderForm();
        return;
      }
      alert('Кажется, у вас сломался интернет, попробуйте позже');
      isLoading = false;
      return renderForm();
    })

}

//При нажатии на энтер добавляется новый комментарий
formAddComm.addEventListener('keyup', (elem) => {
  if (elem.keyCode === 13) {
    addComments();
  }
})

//Удаление последнего комментария
deleteButton.addEventListener('click', () => {
  comments.splice(-1);
  renderComments();
})