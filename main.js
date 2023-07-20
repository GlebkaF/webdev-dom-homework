import { renderLogin } from "./loginPage.js";
import { enterComment } from "./modules/enterComment.js";
import { fetchGet } from "./modules/fetchGet.js";
import { initAnsverEvent } from "./modules/initAnsverEvent.js";
import { initDeleteEvent } from "./modules/initDeleteEvent.js";
import { initLikeEvent } from "./modules/initLikeEvent.js";
import { initRedactorEvent } from "./modules/initRedactorEvent.js";
import { renderListElement } from "./modules/renderListElement.js";

const listElement = document.getElementById('list');
const buttonElement = document.getElementById('add-button');
const nameInputElement = document.getElementById('name');
const commentTextareaElement = document.getElementById('comment');
const formElement = document.getElementById('form');
const loaderListElement = document.getElementById('loader-list');
const loaderCommentElement = document.getElementById('loader-comment');

//Запрашиваем список комментариев (fetch GET)
formElement.style.display = 'none';
loaderCommentElement.style.display = 'none';

let listElementData = [];

fetchGet({ listElement, listElementData, commentTextareaElement, nameInputElement, loaderListElement, formElement, loaderCommentElement });

//Ф-ция цитаты
initAnsverEvent({ listElementData, commentTextareaElement });

//Ф-ция лайков
initLikeEvent({ listElementData });

//Ф-ция редактирования через кнопку (не доработано)
initRedactorEvent({});

//Ф-ция удаления через кнопку
initDeleteEvent({ listElementData });

//Ф-ция рендера
// renderListElement({ listElement, listElementData, commentTextareaElement, nameInputElement });
    
renderLogin();

//Событие выключения кнопки "Написать"
document.addEventListener('mouseover', () => {
  if (nameInputElement.value === '' || commentTextareaElement.value === '') {
    buttonElement.classList.add('button-off');
    buttonElement.disabled = true;
  }
})

//Событие включения кнопки "Написать"
document.addEventListener('keyup', () => {
  if (nameInputElement.value !== '' && commentTextareaElement.value !== '') {
    buttonElement.classList.remove('button-off');
    buttonElement.disabled = false;
  }
})

//Ф-ция добавления комментария:
  //Вызываем функцию добавления комментария через комбинацию клавиш Ctrl + Enter
  document.addEventListener('keyup', function (e) {
    if (e.ctrlKey & e.key === 'Enter') {
      enterComment({ nameInputElement, commentTextareaElement, listElement, loaderCommentElement, loaderListElement, formElement, listElementData });
    }
  });
  //Вызываем функцию добавления комментария через клие по кнопке "Написать"
  buttonElement.addEventListener('click', () => {
    enterComment({ nameInputElement, commentTextareaElement, listElement, loaderCommentElement, loaderListElement, formElement, listElementData });
  });
