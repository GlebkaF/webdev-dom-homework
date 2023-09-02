import { login, setToken, token } from "./api.js";
import { comments } from "./main.js";
import { renderRegictration } from "./registration.js"



export const renderLogin = ({ getDateApi }) => {
const appElement = document.getElementById("app");
  const loginHtml = `<div class="container">
  <div class="add-form" >
    <h1>Форма входа</h1>
    <input
      id="login-input"
      value=""
      class="add-form-name input-form"
      placeholder="Введите логин"
      autocomplete="username"
    />
    <input
      id="password-input"
      value=""
      class="add-form-name input-form"
      placeholder="Введите пароль"
      autocomplete="current-password"
    />
    <br />
      <button class="add-form-button" id="login-button">Войти</button> 
    <div> 
    <p id='reg-page' class="reg-page">Зарегистрироваться</p>  
    </div>
  </div>
  </div>`;

  appElement.innerHTML = loginHtml;

  const regPageElement = document.getElementById("reg-page");
  const buttonEntrance = document.getElementById("login-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");

  regPageElement.addEventListener("click", () => {
    renderRegictration();
  });

  buttonEntrance.addEventListener("click", () => {
    login({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    }).then((responseData) => {
      setToken(responseData.user.token);
      getDateApi({ comments });
    });
  });
};
