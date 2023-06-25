"use strict";

import { getToken, loginUser, regUser, setToken, postComment, fetchAndRenderComments } from "./api.js";


// создаем рендер фукцию для добавления разметки html из JS
export const renderComments = (commentsArr, appHtml, user) => {
 
  // переменная надписи об авторизации
  const goToAuthHtml = `<div>
<p class"auth-text">Чтобы добавить комментарий, 
    <a href="#" id="toggleLink">авторизуйтесь</a></p>
    </div>`;

  // форма авторизации по лоину и паролю
  const authFormHtml = `<div class="login-form" id="addForm">
    <h2 class="comment-text">Авторизация</h2>
    <input type="text" class="add-form-login-password" placeholder="Введите ваше имя" id="loginInput" value="" /> 
    <input type="password" class="add-form-login-password" placeholder="Введите Ваш пароль" id="passwordInput" value=""/>
    <div class="add-form-row">
      <button class="buttonLogin" id="buttonLogin">Войти</button>
    </div>
    <h2 style="text-decoration: underline;" class="comment-text" id="regLink">Зарегистрироваться</h2>
    </div>`;

  // форма регистрации
  const regFormHtml = `<div class="login-form" id="addForm">
    <h2 class="comment-text">Регистрация нового пользователя</h2>
    <input type="text" class="add-form-login-password" placeholder="Введите ваше имя" id="nameInput" value="" />
    <input type="text" class="add-form-login-password" placeholder="Введите ваше логин" id="loginInput" value="" /> 
    <input type="password" class="add-form-login-password" placeholder="Введите Ваш пароль" id="passwordInput" value=""/>
    <div class="add-form-row">
      <button class="buttonLogin" id="buttonReg">Зарегистрироваться</button>
    </div>
    <h2 style="text-decoration: underline;" class="comment-text" id="regLink">Вход по логину</h2>
    </div>`

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
  

  // обработчик клика кнопки "Войти"
  const toggleButtonEl = document.getElementById('toggleLink')
  toggleButtonEl?.addEventListener('click', () => {
    appEl.innerHTML = authFormHtml;

    // Обработчик клика кнопки "Зарегистрироваться"
    const regLinkEl = document.getElementById('regLink')
    regLinkEl.addEventListener('click', () => {
      appEl.innerHTML = regFormHtml;
      const buttonRegEl = document.getElementById('buttonReg')
      buttonRegEl.addEventListener('click', () => {
        const login = document.getElementById('loginInput').value
        const password = document.getElementById('passwordInput').value;
        const name = document.getElementById('nameInput').value;
        regUser(login, name, password)
        .then((response) => {
          setToken(response.user.token);
          fetchAndRenderComments()
        })
      })
    })

    const buttonLoginEl = document.getElementById('buttonLogin');
    buttonLoginEl.addEventListener('click', (user) => {
      const login = document.getElementById('loginInput').value
      const password = document.getElementById('passwordInput').value;
      loginUser(login, password).then((response) => {
        console.log(user);
        setToken(response.user.token);
        renderComments(commentsArr);

        // Обработчик клика на кнопку "Написать"
        const buttonElement = document.getElementById('buttonComment')
        buttonElement.addEventListener('click', () => {
          postComment();
        });
      })
    })
  })
};
