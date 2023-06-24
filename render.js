"use strict";

// Импорт данных из модулей

import { like, initAnswer } from "./option.js"

// создаем рендер фукцию для добавления разметки html из JS
const renderComments = (commentsArr, appHtml) => {

  //  рендер списка комментариев Ul
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


  // Разметка страницы HTML
  
  const appEl = document.getElementById('app');
  appHtml = `<div class="container">
<ul class="comments" id="listComments">
${commentsHtml}
</ul>

<div class="add-form" id="addForm">
  <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="nameInput" value="" />
  <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
    id="commentInput"></textarea>
  <div class="add-form-row">
    <button class="add-form-button" id="buttonComment">Написать</button>

  </div>
</div>

<div class="login-form" id="addForm">
  <h2>Форма входа</h2>
  <input type="text" class="add-form-login-password" placeholder="Введите ваше имя" id="loginInput" value="" /> 
  <input type="password" class="add-form-login-password" placeholder="Введите Ваш пароль" id="passwordInput" />
  <div class="add-form-row">
    <button class="inner-form-button" id="buttonComment">Войти</button>
     
  </div>
  <p style="text-decoration: underline;" class="comment-text preline">Зарегистрироваться</p>
</div>
<p class"auth-text">Чтобы добавить комментарий, 
    <a href="#" id="toggleLink">автаризуйтесь</a> </p>`;

  const elementName = document.getElementById('nameInput');
  const elementComment = document.getElementById('commentInput');
  const listElement = document.getElementById('listComments');
  const buttonElement = document.getElementById('buttonComment');
  const loadingListElement = document.getElementById('loadingList');
  const loadingCommentElement = document.getElementById('loadingComment');
  const addFormElement = document.getElementById('addForm')


  appEl.innerHTML = appHtml;

  // like(commentsArr);
  // initAnswer();


  // Обработчик клика на кнопку "Написать"
  // buttonElement.addEventListener('click', () => {
  //   loadingCommentElement.style.display = 'block';
  //   addFormElement.style.display = 'none';
  //   postComment()
  // });
};

// Экспорт данных в модули
export { renderComments }