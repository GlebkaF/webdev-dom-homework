import { initLikeListener } from "./main.js";
import { initDeleteButtonsListeners } from "./delbutton.js";
import { quoteCommets, commentList } from "./main.js";
import { token } from "./api.js";
const buttonLoginElement = document.getElementById("login-form-button");

export const renderComments = () => {
    const appHtml = document.getElementById("app");
    const commentsHtml = commentList.map((comment, index) => {
        return `<li class="comment" data-index="${index}">
          <div class="comment-header">
            <div id="">${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div id="" class="comment-text" >
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <button id="delete-form-button" class="delete-form-button" data-index="${index}">Удалить</button>
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? "-active-like" : ""}" data-index="${index}"></button>
            </div>
          </div>
        </li>`;
    }).join("");

    const contentHtml = () => {
        if (!token) return buttonLoginElement;
        return `<ul id="comments" class="comments">${commentsHtml}</ul>
    <div id="add-form" class="add-form">
      <input id="add-name" type="text" class="add-form-name" placeholder="Введите ваше имя" />
      <textarea id="add-text" type="textArea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button id="add-form-button" class="add-form-button">Написать</button>
      </div>
    </div>`
    }
    const btnLogin = `
    <p class="render-login-btn">  Чтобы добавить комментарий, 
    <u>авторизуйтесь</u> </p>`

    function actionRenderLoginbtn() {
        if (token) return
        const btn = document.querySelector(".render-login-btn")
        btn.addEventListener('click', () => {
          renderLogin()
        })
      }

    initLikeListener();
    initDeleteButtonsListeners();
    quoteCommets();

};

export const renderLoginForm = () => {
    appHtml.innerHTML = loginHtml;
    const appHtml = document.getElementById("app");
    const loginHtml = `autForm`
    return `
    <divclass="container">
      <input 
      type="text" 
      class="login-form-login" 
      placeholder="Логин"
      />
      <input 
      type="text"
      class="login-form-pass"
      placeholder="Пароль"
      />
      <button id="login-form-button" class="login-form-button">Войти</button>
    </div>`;
}
token ? renderLoginForm() : buttonLoginElement;