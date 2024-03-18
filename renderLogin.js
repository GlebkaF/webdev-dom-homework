import { login, setLoading, setToken } from "./api.js"
import { renderForm } from "./renderForm.js";

export let userLogin;
export const setLogin = (newUserLogin) => {
  userLogin = newUserLogin;
};

export const renderLogin = ({ fetchGetAndRenderComments }) => {
  const appElement = document.getElementById("appp");
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
    `;
  appElement.innerHTML = loginHTML;

  const ButtonElement = document.getElementById("login-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");

  ButtonElement.addEventListener("click", () => {
    login({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    })
      .then((responseData) => {
        setToken(responseData.user.token);
        return responseData;
      })
      .then((responseData) => {
        const userName = responseData.user.name;
        setLogin(true);
        setLoading(false);
        fetchGetAndRenderComments();
        renderForm(userName);
      });
  });
};
