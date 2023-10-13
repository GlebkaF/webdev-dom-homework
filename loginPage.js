import { login, setToken, token } from "./api.js";
import {fetchAndRenderComments} from "./main.js";

export const renderLogin = () => {
    const appElement = document.getElementById("app");
    const loginHtml = `
    <div class="container">
    <div class="add-form">
    <h1 class="form">Форма входа</h1>
    <input
      type="text" id="login-input"
      class="add-form-name-login"
      placeholder="Введите логин"
    />
    <br>
    <input
      type="text" id="password-input"
      class="add-form-name-password"
      placeholder="Введите пароль"
    />
      <br/>
      <button class="button" id="login-button">Войти</button>
      <a class="login" href="init.html" id="link-to-login">Регистрация</a>
    </div>
    </div>`;
  
appElement.innerHTML = loginHtml;

const buttonElement = document.getElementById("login-button");
const loginInputElement = document.getElementById("login-input");
const passwordInputElement = document.getElementById("password-input");

buttonElement.addEventListener("click", () => {
    login({
        login: loginInputElement.value,
        password: passwordInputElement.value,
    }).then((responseData) => {
        console.log(token);
        setToken(responseData.user.token);
        console.log(token);
    })
    .then(() => {
      fetchAndRenderComments();
    })
  });
};

