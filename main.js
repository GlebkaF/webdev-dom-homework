
"use strict";
import {elementName, listElement, buttonElement, loadingCommentElement,addFormElement, comments  } from './module/element.js'
import {postCommit, fetchAndRenderComments} from './module/api.js' //вызываем API
import { renderComments } from './module/render.js'; //обращаемся к рендер функции



fetchAndRenderComments();


loadingCommentElement.style.display = 'none';





// Добавляем обработчик клика на кнопку "Написать"

buttonElement.addEventListener('click', () => {

  loadingCommentElement.style.display = 'block';
  addFormElement.style.display = 'none';


  postCommit();
  
});


// Отправка коммента с помощью кнопки Enter

document.addEventListener('keyup', (event) => {
  if (event.key === "Enter") {
    buttonElement.click()
  }
});

 

// Активность кнопки "Написать"

buttonElement.disabled = true;

elementName.addEventListener('input', () => {
  if (elementName.value.trim() !== "") {
    buttonElement.disabled = false;
  } else {
    buttonElement.disabled = true;
  }
});

//Удаление последнего комментария
const deleteComment = document.getElementById('delComment')
deleteComment.addEventListener('click', () => {
  const lastCommentIndex = listElement.innerHTML.lastIndexOf(`<li class="comment">`);
  if (lastCommentIndex !== -1) {
    listElement.innerHTML = listElement.innerHTML.substring(0, lastCommentIndex)
  }
  comments.pop();
  renderComments();
});


console.log("It works!");
