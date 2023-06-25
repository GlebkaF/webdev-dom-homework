"use strict";

import { getToken, loginUser, regUser, setToken, postComment, fetchAndRenderComments } from "./api.js";



const sendComment = () => {
  const commentButton = document.getElementById('buttonComment');
  commentButton.addEventListener('click', () => {
    postComment()
  })
}
// создаем рендер фукцию для добавления разметки html из JS
export const renderComments = (commentsArr, appHtml, user) => {
  let isloginemode = true;
  // переменная надписи об авторизации
  const goToAuthHtml = `<div>
<p class"auth-text">Чтобы добавить комментарий, 
    <a href="#" id="loginLink">авторизуйтесь</a></p>
    </div>`;

  // форма добавления комментария
  const commentFormHtml = `
    <div class="add-form" id="addForm">
  <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="nameInput" value="" disabled
  />
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

  appEl.innerHTML = appHtml;


  // Обработчик клика Авторизуйтесь
  const loginLinkEl = document.getElementById('loginLink')
  loginLinkEl?.addEventListener('click', () => {
    renderLoginform();
  })

  // обработчик клика кнопки "Войти"
  const renderLoginform = () => {
    appEl.innerHTML = `<div class="login-form" id="addForm">
  <h2 class="comment-text">${isloginemode ? "Авторизация" : "Регистрация"}</h2>
   ${isloginemode ? '' : `<input type="text" class="add-form-login-password" placeholder="Введите ваше имя" id="nameInput" value="" />`}

  <input type="text" class="add-form-login-password" placeholder="Введите ваше логин" id="loginInput" value="" /> 

  <input type="password" class="add-form-login-password" placeholder="Введите Ваш пароль" id="passwordInput" value=""/>
  
  <div class="add-form-row">
    <button class="buttonLogin" id="buttonLogin">${isloginemode ? 'Войти' : 'Зарегистрироваться'}</button>
  </div>
  <a href='#' style="text-decoration: underline;" class="comment-text" id="toggleLink">${isloginemode ? 'Зарегистрироваться' : "Войти"}</a>
  </div>`

    const toggleButtonEl = document.getElementById('toggleLink')
    toggleButtonEl.addEventListener('click', () => {
      isloginemode = !isloginemode;
      renderLoginform();
    });


    // Обработчик клика войти/зарегистроваться
    const buttonLoginEl = document.getElementById('buttonLogin');
    buttonLoginEl.addEventListener('click', () => {
      const login = document.getElementById('loginInput').value;
      const password = document.getElementById('passwordInput').value;


      if (isloginemode) {
        loginUser(login, password).then((response) => {
          setToken(response.user.token);
          renderComments(commentsArr);
          sendComment()
        })
      } else {
        const name = document.getElementById('nameInput').value;
        regUser(login, password, name)
          .then((response) => {
            setToken(response.user.token);
            fetchAndRenderComments()
            sendComment()
          })
      }
    })
  }
}
