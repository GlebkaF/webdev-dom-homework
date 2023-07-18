import { login, setToken, setUserName, userName } from "./api.js";
import { renderRegister } from "./renderRegister.js";

export const renderLogin = ({ getTodo }) => {
    const appElement = document.getElementById("login-app");
    const loginHtml = `
    <div class="container">
    <div class="enter-form">
        <h2>Форма входа</h2>
      <input
        id="login-input"
        type="text"
        class="enter-form-login"
        placeholder="Введите логин"
      />
      <input
        id="password-input"
        type="password"
        class="enter-form-password"
        placeholder="Введите пароль"
      ></input>
      <div class="enter-form-row">
        <button id="enter-button" class="enter-form-button">Войти</button>
      </div>
      <div class="enter-form-text">
        <a id="register-link" class="enter-form-link">Зарегистрироваться</a>
      </div>
    </div>
  </div>
    `;

    appElement.innerHTML = loginHtml;

    const enterButton = document.getElementById("enter-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");
    const registerLink = document.getElementById('register-link')

    enterButton.addEventListener("click", () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            console.log(responseData);
            setToken(responseData.user.token);
            setUserName(responseData.user.name);
            console.log(userName);
        }).then(() => {
          getTodo();
        })
    });

    registerLink.addEventListener('click', () => {
      renderRegister();
    });
};