import { listElement } from "./main.js";
import { initlikeButtonListeners } from "./main.js";
import { initAnswerComment } from "./main.js";



const renderComments = (comments) => {
  const appEl = document.getElementById("app");
  const commentsHtml = comments.map((comment, index) => {

    let isLike = '';
    if (comments[index].isLiked) {
      isLike = '-active-like'
    }
    return `<li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter ">${comment.like}</span>
            <button class="like-button  ${isLike}" data-index="${index}"></button>
          </div>
        </div>
      </li>`


  }).join('');

   const appHtml = `
      <div class="container">
        <ul id="list" class="comments">
          <!-- Список рендериться в main -->
          ${commentsHtml}
        </ul>
        <div id="block-form" class="login-form">
          <input id="login-input" type="text" class="add-form-name" placeholder="Введите ваш логин" />
          <br/>
          <input id="password-input" type="text" class="add-form-name" placeholder="Введите ваш пароль" />
          <div class="login-form-row">
            <button id="login-button" class="login-form-button">Войти</button>
          </div>
        </div>
      </div>

      <div class="container">
        <div>
          <h3 id="invizDivHeader">Идет загрука комментариев...</h3>
        </div>
        <ul id="list" class="comments">
          <!-- Список рендериться в main -->
        </ul>
        <div>
          <h3 id="invizDiv">Загружаю комментарий...</h3>
        </div>
        <div id="block-form" class="add-form">
          <input id="name-input" type="text" class="add-form-name" placeholder="Введите ваше имя" />
          <textarea id="comment-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
            rows="4"></textarea>
          <div class="add-form-row">
            <button id="add-button" class="add-form-button">Написать</button>
          </div>
          <div class="add-form-row">
            <button id="delet-button" class="add-form-button">Удалить коммент</button>
          </div>
        </div>
      </div>`



      appEl.innerHTML = appHtml;

      const nameInputElement = document.getElementById("name-input");
  initlikeButtonListeners(comments);
  initAnswerComment();

};

export {nameInputElement, renderComments};