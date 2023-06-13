
import { currentUser, token, renderLogin  } from "./loginCompontnt.js";
import { like, initAnswer, sendComment } from "./optionComment.js";
import { letDisabledButton, letClearForm } from "./elementChange.js";
import { fetchAndRenderComments } from "./api.js";


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
  const elComment = document.getElementById('listComments');
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
    elComment.innerHTML = commentsHtml;
  
  
  };

  const renderApp = (commentArr) => {
    const appElement = document.getElementById('app');

    if(!token) {
      renderLogin(appElement, fetchAndRenderComments);
      return;
    }

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

    const appHtml = `
    <ul class="comments" id="listComments">
    ${commentsHtml}
    </ul>
      <p class="loading-text disnone" id="loadingList">
        Идет загрузка комминтариев, подожите...
      </p>
    <div class="add-form" id="addForm">
      <input type="text" class="add-form-name" id="nameInput" value= ${currentUser} disabled/>
      <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
        id="commentInput"></textarea>
      <div class="add-form-row">
        <button class="add-form-button add-form-button_disable" id="buttonComment" disabled>Написать</button>
      </div>
    </div>`

    appElement.innerHTML = appHtml;

    const elementName = document.getElementById('nameInput');
    // поле ввода имяни
    const elementComment = document.getElementById('commentInput');
    // поле ввода текста
    const buttonElement = document.getElementById('buttonComment');
    // отправка сообщения
 

    elementName.addEventListener('input', () => {
      letDisabledButton(elementName.value)
    });
    elementComment.addEventListener('input', () => {
      letDisabledButton(elementComment.value);
    });
    elementName.addEventListener('click', () => {
      letClearForm(elementName);
    });
    elementComment.addEventListener('click', () => {
      letClearForm(elementComment);
    });

    buttonElement.addEventListener('click', sendComment)

    document.addEventListener('keyup', (event) => {
      if (event.code === "Enter") {
        sendComment();
      }
    });

    like(commentArr);
    initAnswer();
  }

  
  
  export { renderComments, formDataComment, renderApp }