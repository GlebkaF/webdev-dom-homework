import {initlikeButtonsListeners, redactComments, initiateRedact} from "./main.js";

// Рендерим из массива разметку
function renderComments(element, getListComments, comments) {

const commentsHTML = comments.map((comment, index) => getListComments(comment, index)).join('');
const appHtml = `<div class="preloader">
    <p class="preloader-text">Пожалуйста, подождите, комментарии загружаются...</p>
  </div>
  <div class="container">
    <ul class="comments" id="list">
    ${commentsHTML}
    </ul>

    <div class="login-form" id="enter-form">
      Форма входа
      <br>
      <input type="text" class="login-form-input" placeholder="Введите логин" id="enter-form-login" />
      <input type="password" class="login-form-input" placeholder="Введите пароль" id="enter-form-password" />
      <div class="login-form-row">
        <button class="login-form-button" id="enter-button-enter">Войти</button>
        <button class="login-form-button-reg" id="enter-button-reg">Зарегистрироваться</button>
      </div>
    </div>

    <div class="login-form" id="login-form">
      Форма регистрации
      <br>
      <input type="text" class="login-form-input" placeholder="Введите имя" id="login-form-name" />
      <input type="text" class="login-form-input" placeholder="Введите логин" id="login-form-login" />
      <input type="password" class="login-form-input" placeholder="Введите пароль" id="login-form-password" />
      <div class="login-form-row">
        <button class="login-form-button" id="login-button-reg">Зарегистрироваться</button>
        <button class="login-form-button-reg" id="login-button-enter">Войти</button>
      </div>
    </div>

    <div class="add-form" id="add-form">
      <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="name-input" />
      <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
        id="coment-input"></textarea>
      <div class="add-form-row">
        <button class="add-form-button" id="end-delete-button">Удалить</button>
        <button class="add-form-button" id="add-button">Написать</button>
      </div>
    </div>

    <div class="loading">Ваш комментарий добавляется...</div>
  </div>`

 
    element.innerHTML = appHtml;
    initlikeButtonsListeners();
    redactComments();
    initiateRedact();
}
export default renderComments;