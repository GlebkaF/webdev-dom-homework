"use strict";

import { fetchAndRenderComments, postComment } from "./moduleJs/api.js";
import { delay } from "./moduleJs/delay.js";
import { initLikeButtonListeners } from "./moduleJs/likeButton.js";
import { removeValidation } from "./moduleJs/removeValid.js";
import { renderComments } from "./moduleJs/renderComments.js";
import { reply } from "./moduleJs/reply.js";

const addButtonElement = document.getElementById('add-button');
const nameInputElement = document.getElementById('name-input');
const commentInputElement = document.getElementById('comment-input');
const preLoadElement = document.getElementById('preloader');



// Получениe комментов с сервера
function getComments() {

  fetchAndRenderComments().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date).toLocaleDateString('ru-RU', { year: '2-digit', month: '2-digit', day: '2-digit' }) + ' ' + new Date(comment.date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        comment: comment.text,
        likesCounter: comment.likes,
        isLiked: comment.isLiked,
      };
    });
    comments = appComments;
    renderComments({ comments, initLikeButtonListeners, reply, removeValidation, delay });
    preLoadElement.classList.add('hide');
  });
}
getComments();


//  Массив для комментов 
let comments = [];


// Кнопка для лайка 
initLikeButtonListeners({comments, renderComments, reply, removeValidation, delay});


// Ответ по клику на коммент 
reply({comments});



// Отмена валидации (чтобы не было красных полей)
removeValidation();



// Добавление нового коммента на сервер 
addButtonElement.addEventListener('click', () => {
  nameInputElement.classList.remove('error');
  commentInputElement.classList.remove('error');

  if (nameInputElement.value.trim() === '' || commentInputElement.value.trim() === '') {
    nameInputElement.classList.add('error');
    commentInputElement.classList.add('error');
    return;
  };

  addButtonElement.disabled = true;
  addButtonElement.textContent = 'Комментарий добавляется.....';

  postComment(

    { name: nameInputElement.value },
    { text: commentInputElement.value, }

  ).then(() => {

    return getComments();

  }).then(() => {

    addButtonElement.disabled = false;
    addButtonElement.textContent = 'Добавить';
    nameInputElement.value = '';
    commentInputElement.value = '';

  }).catch((error) => {

    if (error === 'Сервер сломался, попробуй позже') {

      alert('Сервер сломался, попробуй позже');

      addButtonElement.disabled = false;
      addButtonElement.textContent = 'Добавить';

    } else if (error === 'Имя и комментарий должны быть не короче 3 символов') {

      alert('Имя и комментарий должны быть не короче 3 символов');

      addButtonElement.disabled = false;
      addButtonElement.textContent = 'Добавить';

    };
  });
  renderComments({comments, initLikeButtonListeners, reply, removeValidation, delay});
});


