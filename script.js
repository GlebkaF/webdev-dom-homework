"use strict";

// Импорт данных из модулей
import { renderComments } from './render.js'
import { fetchAndRenderComments, postComment } from './api.js';


//  Массив в который будем рендерить полученные данные
let comments = [];


// Убираем обработчик загрузки с экрана
// loadingCommentElement.style.display = 'none';

// Функция обработчика даты
const DateFormatComment = (commentDate) => {
  const dateComment = new Date(commentDate);
  const formatDate = dateComment.getDate().toString().padStart(2, '0') + '.' +
    (dateComment.getMonth() + 1).toString().padStart(2, '0') + '.' +
    dateComment.getFullYear().toString().slice(-2) + ' ' +
    dateComment.getHours().toString().padStart(2, '0') + ':' +
    dateComment.getMinutes().toString().padStart(2, '0');
  return formatDate
}

// Обработчик клика на кнопку "Написать"
// buttonElement.addEventListener('click', () => {
//   loadingCommentElement.style.display = 'block';
//   addFormElement.style.display = 'none';
//   postComment()
// });

// Активность кнопки "Написать"
// buttonElement.disabled = true;
// elementName.addEventListener('input', () => {
//   if (elementName.value.trim() !== "") {
//     buttonElement.disabled = false;
//   } else {
//     buttonElement.disabled = true;
//   }
// });

//Удаление последнего комментария
// const deleteComment = document.getElementById('delComment');
// deleteComment.addEventListener('click', () => {
//   const lastCommentIndex = listElement.innerHTML.lastIndexOf(`<li class="comment">`);
//   if (lastCommentIndex !== -1) {
//     listElement.innerHTML = listElement.innerHTML.substring(0, lastCommentIndex)
//   }
//   comments.pop();
//   renderComments();
// });

fetchAndRenderComments();

console.log("It works!");

// Экспорт данных в модули
export { comments, DateFormatComment };