"use strict";

// Импорт данных из модулей
import {elementName, elementComment, listElement, loadingListElement, loadingCommentElement,  addFormElement} from './script.js'
import {like, initAnswer} from "./option.js"

// создаем рендер фукцию для добавления разметки html из JS
const renderComments = (commentsArr) => {

    const commentsHtml = commentsArr.map((comment, index) => {
      let likeActive = '';
      if (commentsArr[index].isActiveLike) {
        likeActive = '-active-like';
      }
      return `<li class="comment">
<div class="comment-header">
  <div>${comment.name}</div>
  <div>${comment.date}</div>
</div>
<div class="comment-body">
  <div class="comment-text preline">${comment.textComment}</div>
</div>
<div class="comment-footer">
  <div class="likes">
    <span class="likes-counter">${comment.likes}</span>
    <button class="like-button ${likeActive}" data-index="${index}"></button>
  </div>
</div>
</li>`;
    }).join("");
    listElement.innerHTML = commentsHtml;

    loadingListElement.style.display = 'none';
    loadingCommentElement.style.display = 'none';
    addFormElement.style.display = 'flex';

    elementName.value = '';
    elementComment.value = '';

    like(commentsArr);
    initAnswer();
  };

 // Экспорт данных в модули
  export { renderComments }