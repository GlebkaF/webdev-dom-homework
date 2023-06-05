
import {elementName, elementComment, listElement, loadingListElement, loadingCommentElement, addFormElement } from "./element.js"
import { like, initAnswer } from "./optionComment.js";



 // Обработчик Даты
 const formDataComment = (commentDate) => {
    const dateComment = new Date(commentDate);
    const formatDate =
      dateComment.getDate().toString().padStart(2, '0') + '.' +
      (dateComment.getMonth() + 1).toString().padStart(2, '0') + '.' +
      dateComment.getFullYear().toString().slice(-2) + ' ' +
      dateComment.getHours().toString().padStart(2, '0') + ':' +
      dateComment.getMinutes().toString().padStart(2, '0');
      return formatDate
   }

// создаем рендер фукцию  html из JS

const renderComments = (commentArr) => {

    const commentsHtml = commentArr.map((comment, index) => {
      let likeActive = '';
      if (commentArr[index].isActiveLike) {
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
  
    elementName.value = '';
    elementComment.value = '';
  
    loadingCommentElement.style.display = 'none';
    addFormElement.style.display = 'flex';
    like(commentArr);
    initAnswer();
  };

  
  
  export { renderComments, formDataComment }