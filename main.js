"use strict";

import { fetchAndRenderComments, postComment } from "./modulesForJs/api.js";
import { delay } from "./modulesForJs/delay.js";
import { initLikeButtonListeners } from "./modulesForJs/likeButton.js";
import { removeValidation } from "./modulesForJs/removeValid.js";
import { renderComments } from "./modulesForJs/renderComments.js";
import { reply } from "./modulesForJs/reply.js";

const addButtonElement = document.getElementById('add-button');
const nameInputElement = document.getElementById('name-input');
const commentInputElement = document.getElementById('comment-input');
const preLoadElement = document.getElementById('preloader');



// const commentsBlockElement = document.getElementById('comments-block');
// const addFormElement = document.getElementById('add-form');
// const loginFormElement = document.getElementById('login-form');
// const logButtonElement = document.getElementById('log-button');

// // localStorage.getItem('isLogined');
// console.log(localStorage.getItem('isLogined'));

// const isLogined = localStorage.getItem('isLogined');
// if (isLogined === null) {
//   commentsBlockElement.style.display = 'none';
//   addFormElement.style.display = 'none';
//   loginFormElement.style.display = 'block';
// } else {
//   commentsBlockElement.style.display = 'block';
//   addFormElement.style.display = 'block';
//   loginFormElement.style.display = 'none';
// }

// logButtonElement.addEventListener('click', () => {

//   const loginValue = document.getElementById('login-input').value;
//   const passwordValue = document.getElementById('password-input').value;

//   const host = 'https://wedev-api.sky.pro/api/v2/rustam-kholov/comments';
//   const token = '';

//   return fetch (

//     host,  {
//       method: "GET",
//       headers: {
//         Authorization: token,
//     },
//   },
// )
// });



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
initLikeButtonListeners({ comments }, { renderComments });

// Ответ по клику на коммент 
reply({ comments });

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
  renderComments({ comments, initLikeButtonListeners, reply, removeValidation, delay });
});


