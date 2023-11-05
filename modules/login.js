import { loginUser, authorizedUser, setToken } from "./api.js";
import {
  fetchAndRender,
  handleEnterKey,
  getUsers,
  getComments,
} from "./main.js";
import { renderUsers } from "./render.js";

let isSignedUp = false;
export function userAuthorization() {
  let isLogged = true;
  function renderForm() {
    const loginElement = document.querySelector(".autorization");
  }
}

// `
// <div class="add-form">
//   <h3 class="form-title">Форма входа</h3>
//   <div class="form-row">
//     Логин
//     <input type="text" id="login-input" value="" class="add-form-name" />
//     <br />
//     Пароль
//     <input type="text" id="login-input" value="" class="add-form-name" />
//   </div>
//   <textarea
//     id="comment-input"
//     class="add-form-text"
//     placeholder="Введите ваш комментарий"
//     rows="4"
//   ></textarea>
//   <div class="add-form-row">
//     <button id="add-button" class="login-button">Войти в IT</button>
//   </div>
// </div>
