"use strict";

import { fetchAndRenderComments, postComment } from "./api.js";
import { renderComments } from "./renderComments.js";

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
      renderComments({comments, initLikeButtonListeners, reply, removeValidation});
      preLoadElement.classList.add('hide');
    });
}



//  Массив для комментов 
let comments = [];



// Рендер функция 


getComments();



// Отложенный коммент
function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}



// Кнопка для лайка 
const initLikeButtonListeners = () => {
  
  const addLikesButtonsElements = document.querySelectorAll('.like-button');


  for (const addLikesButtonsElement of addLikesButtonsElements) {

    const index = addLikesButtonsElement.dataset.index;
    const counter = addLikesButtonsElement.dataset.like;

    addLikesButtonsElement.addEventListener('click', () => {

      addLikesButtonsElement.classList.add('-loading-like')

      delay(4000).then(() => {

        if (comments[index].isLiked === false) {

          const result = Number(counter) + 1;
          comments[index].likesCounter = result;

          comments[index].isLiked = true;

        } else {

          const result = Number(counter) - 1;
          comments[index].likesCounter = result;

          comments[index].isLiked = false;
        }
        renderComments({comments, initLikeButtonListeners, reply, removeValidation});
      });
    })
  }
};



// Ответ по клику на коммент 
function reply() {

  const commentElements = document.querySelectorAll('.comment-body');
  const formTextElement = document.querySelector('.add-form-text');

  commentElements.forEach((element, index) => {
    element.addEventListener('click', () => {
      formTextElement.value = `> ${comments[index].name} \n ${comments[index].comment}`;
    });
  });
}

reply();



// Отмена валидации (чтобы не было красных полей)
function removeValidation() {

  nameInputElement.addEventListener('click', () => {
    nameInputElement.classList.remove('error');
    commentInputElement.classList.remove('error');
  });

  commentInputElement.addEventListener('click', () => {
    nameInputElement.classList.remove('error');
    commentInputElement.classList.remove('error');
  });

};

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

    {name: nameInputElement.value},
    {text: commentInputElement.value,}
    
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
    renderComments({comments, initLikeButtonListeners, reply, removeValidation});;
});
