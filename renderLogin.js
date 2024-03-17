import { login, setToken, token } from "./api.js"
import { formEl } from "./renderComments.js"

let userLogin = false;

export const renderLogin = ({ fetchGetAndRenderComments }) => {
  const appElement = document.getElementById("app");
  const loginHTML = `
    <div class="container">
    <div id="login-form" class="add-form">
    <h3 class="form-title">Форма входа</h3>
      <input
        id="login-input"
        type="text"
        class="add-form-login"
        placeholder="Логин"
      />
      <input
        id="password-input"
        type="password"
        class="add-form-pass"
        placeholder="Пароль"
      ></input>
      <div class="add-form-row">
        <button id="login-button" class="add-form-button">Войти</button>
      </div>
    </div>
  </div>
    `
  appElement.innerHTML = loginHTML;

  const loginFormEl = document.getElementById("login-form");
  const ButtonElement = document.getElementById("login-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");
  const loginTextEl = document.getElementById("login-text");

  ButtonElement.addEventListener("click", () => {
    login({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    }).then((responseData) => {
      console.log(token);
      setToken(responseData.user.token);
      console.log(token);
      userLogin = true;
    }).then(() => {
      formEl.classList.remove("add-form_displayNone");
      loginTextEl.hidden = true;
      loginFormEl.classList.add("add-form_displayNone");
      fetchGetAndRenderComments();
    })
  })
}