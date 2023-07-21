import { renderLogin } from "./modules/loginPage.js";
import { enterComment } from "./modules/enterComment.js";
import { fetchGet } from "./modules/fetchGet.js";
import { initAnsverEvent } from "./modules/initAnsverEvent.js";
import { initDeleteEvent } from "./modules/initDeleteEvent.js";
import { initLikeEvent } from "./modules/initLikeEvent.js";
import { initRedactorEvent } from "./modules/initRedactorEvent.js";
import { format } from "date-fns";

export const listElement = document.getElementById('list');
export const buttonElement = document.getElementById('add-button');
export const nameInputElement = document.getElementById('name');
export const commentTextareaElement = document.getElementById('comment');
export const formElement = document.getElementById('form');
export const loaderListElement = document.getElementById('loader-list');
export const loaderCommentElement = document.getElementById('loader-comment');
export const appElement = document.getElementById("app");

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

renderLogin({ listElement, listElementData });

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
