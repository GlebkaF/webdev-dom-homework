"use strict";

import { fetchAndRenderComments, getToken, loginUser, setToken } from "./api.js";

// Импорт данных из модулей

import { like, initAnswer } from "./option.js"

// создаем рендер фукцию для добавления разметки html из JS
const renderComments = (commentsArr, appHtml) => {

  //  рендер списка комментариев Ul
  const goToAuthHtml = `<div>
<p class"auth-text">Чтобы добавить комментарий, 
    <a href="#" id="toggleLink">авторизуйтесь</a></p>
    </div>`

  const authFormHtml = `<div class="login-form" id="addForm">
    <h2>Авторизация</h2>
    <input type="text" class="add-form-login-password" placeholder="Введите ваше имя" id="loginInput" value="" /> 
    <input type="password" class="add-form-login-password" placeholder="Введите Ваш пароль" id="passwordInput" value=""/>
    <div class="add-form-row">
      <button class="inner-form-button" id="buttonLogin">Войти</button>
  <p style="text-decoration: underline;" class="comment-text">Зарегистрироваться</p>
    </div>
    </div>`;
    const commentFormHtml = `
    <div class="add-form" id="addForm">
  <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="nameInput" value="" />
  <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
    id="commentInput"></textarea>
  <div class="add-form-row">
    <button class="add-form-button" id="buttonComment">Написать</button>

  </div>
  </div>`

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
</div>

 ${!getToken() ? goToAuthHtml : commentFormHtml}
`;

  const elementName = document.getElementById('nameInput');
  const elementComment = document.getElementById('commentInput');
  const listElement = document.getElementById('listComments');
  const buttonElement = document.getElementById('buttonComment');
  const loadingListElement = document.getElementById('loadingList');
  const loadingCommentElement = document.getElementById('loadingComment');
  const addFormElement = document.getElementById('addForm')


  appEl.innerHTML = appHtml;

  const toggleButtonEl = document.getElementById('toggleLink')
  toggleButtonEl?.addEventListener('click', () => {
    appEl.innerHTML = authFormHtml;

    const buttonLoginEl = document.getElementById('buttonLogin');
    buttonLoginEl.addEventListener('click', () => {
      const login = document.getElementById('loginInput').value
      const password = document.getElementById('passwordInput').value;
loginUser(login, password).then((response) => {
  console.log(response.user);
  setToken(response.user.token)
  fetchAndRenderComments();
})
    })
  })

  
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