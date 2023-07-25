import { login, setToken, token, setLogin, name } from "./api.js";


export const renderLogin = ({ fetchPromiseFunctionGet }) => {
  const appElement = document.querySelector(".app");
  const loginHtml = `<div class="add-form">
    <span class="entry-form">Форма входа</span>
    <input type="text" class="input-login" placeholder="Введите Ваш логин" id="name-input" />
    <input type="text" class="input-password" placeholder="Введите Ваш Пароль" id="name-input" />
    <div class="add-form-row">
      <button id="add-button" class="entrance-app">Войти</button>
    </div>
    <div class="item-link-to-registration">
      <a href="registration.html" class="link-to-registration">Зарегистрироваться</a>
    </div>
  </div>`;

  appElement.innerHTML = loginHtml;

  const buttonElement = document.querySelector(".entrance-app");
  const loginInputElement = document.querySelector(".input-login");
  const passwordInputElement = document.querySelector(".input-password");

  buttonElement.addEventListener("click", () => {
    login({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    })
      .then((responseData) => {
        console.log(responseData);
        setLogin(responseData.user.name);
        console.log(name);
        setToken(responseData.user.token);
        console.log(token);
      })
      .then(() => {
        fetchPromiseFunctionGet();
      });
  });
};
