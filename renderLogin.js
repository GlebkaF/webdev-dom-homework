import { login, token, setToken, setName } from "./api.js";
import { apiCommentsGet, comments } from "./main.js";
// import { renderFunction } from "./renderFunction.js";

// export function setName(newName) {
//   window.userName = newName;
// }

export const renderLogin = () => {
  const appElement = document.getElementById("app");

  const loginHtml = `
  <div class="container">
  <div class="add-form">
        <h2 class="login-title">Форма входа</h2>
        
        <div class="form-row">
        <input type="text" id="login-input" class="add-form-login" placeholder="Введите логин">
        <input type="password" id="password-input" class="add-form-login" placeholder="Введите ваш пароль">
        </div>
        <button id="login-button" class="login-button">Войти</button>
  </div>
</div>
   `;

  appElement.innerHTML = loginHtml;

  const buttonLoginElement = document.getElementById("login-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");

  token
    ? ""
    : buttonLoginElement.addEventListener("click", () => {
        login({
          login: loginInputElement.value,
          password: passwordInputElement.value,
        })
          .then((responseData) => {
            setName(responseData.user.name);
            setToken(responseData.user.token);
            return responseData;
          })
          .then(() => {
            apiCommentsGet({ comments });
          })
          .catch((error) => {
            console.error(error);
            console.warn("Проблемы с паролем");
          });
      });
};
