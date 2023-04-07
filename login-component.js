import { getDate } from "./secondaryFunc.js";
import {login} from './api.js';

export function renderLoginComponent({
  appEl,
  comments,
  setToken,
  renderComments,
 
}){
    const commentsHtml =
    comments.map((user, index) => {
      return `<li class="comment"  data-name="${user.author.name}" data-comment="${user.text}">
      <div class="comment-header">
        <div>${user.author.name}</div>
        <div>${getDate(user.date)}</div>
      </div>
      <div class="comment-body" >
     <div class ="comment-text"> ${user.text} </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${user.likes}</span>
          <button data-index="${index}"  class="${user.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
      
        </div>
      </div>
    </li>`
    }).join('')

    const appHtml = `
            <div class="container">
              <p id = 'waitComment' style="display: none">Комментарии загружаются...</p>
              <ul id="list" class="comments">
                ${commentsHtml}
              </ul>
              <p id = 'addingComment' style="display: none">Комментарий добавляется...</p>
              

            <div class="add-form">
              <h2 class="class">Форма входа</h2>
              <input
                type="text"
                id="login-input"
                class="add-form-name"
                placeholder="Введите ваш логин"
              /> <br/>
              <input
                type="text"
                id="password-input"
                class="add-form-name"
                placeholder="Введите ваш пароль"
              />
              
              <div class="add-form-row">
                <button id="login-button" class="add-form-button">Войти</button>
                <button data-id = 'id' id="reg-button" class="add-form-button">
                  Зарегистрироваться
                </button>
              </div>
            </div>

          </div>`;

    appEl.innerHTML = appHtml;

    document.getElementById("login-button").addEventListener("click", () => {
    
      login({
        login: "admin",
        password: "admin",
      }).then ((user) => { 
               
          setToken(`Bearer ${user.user.token}`)
          
          renderComments();
      });
      
    });

}