"use strict";

// Импорт данных из модулей
import { renderComments } from './render.js'
import { fetchAndRenderComments, postComment } from './api.js';


//  Массив в который будем рендерить полученные данные
let comments = [];

export let isPosting = false;

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




fetchAndRenderComments();

console.log("It works!");

// Экспорт данных в модули
export { comments, DateFormatComment };