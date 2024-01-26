import { login, register, setToken, token } from "./api.js";
import { fetchAndRenderComments, setUser } from './main.js';



//отрисовка формы входа
export const renderLogin = () => {
  const appElement = document.getElementById("app");
  const loginHtml = `
  <div class="container">
  <div id="log-form" class="add-form">
    <h3>Форма входа</h3>
    <input type="text" id="login-input" class="form-name" placeholder="Введите логин" />
    <input type="password" id="password-input" class="form-password" placeholder="Введите пароль" />
    <div class="add-form-row">
      <button id="log-button" class="log-form-button">Войти</button>
    </div>
      <button id="reg-button" class="reg" href="#">Зарегистрироваться</button>
    </div>
  </div>
`;
  appElement.innerHTML = loginHtml;

  const buttonElement = document.getElementById("log-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");


  buttonElement.addEventListener("click", () => {
    if (!loginInputElement.value || !passwordInputElement.value) {
      alert("Проверьте оба поля  на заполненность");
      return
    }
    login({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    }).then((responseData) => {
      setToken(responseData.user.token);
      setUser(responseData.user);

    }).then(() => {
      fetchAndRenderComments();
    })
  });




  const regButtonElement = document.getElementById("reg-button");
  regButtonElement.addEventListener("click", () => {
    renderRegin();
  });
};









export const renderRegin = () => {
  const appElement = document.getElementById("app");
  const loginHtml = `
<div class="container">
  <div id="log-form" class="add-form">
    <h3>Форма регистрации</h3>
    <input type="text" id="name-input" class="form-name" placeholder="Введите имя" />
    <input type="text" id="login-input" class="form-name" placeholder="Введите логин" />
    <input type="password" id="password-input" class="form-password" placeholder="Введите пароль" />
    <div class="add-form-row">
      <button id="reg-button" class="log-form-button">Зарегистрироваться</button>
    </div>
    <button id="log-button" class="reg" href="#">Войти</button>
  </div>
</div>
`;
  appElement.innerHTML = loginHtml;



  const regButtonElement = document.getElementById("reg-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");
  const nameInputElement = document.getElementById("name-input");

  regButtonElement.addEventListener("click", () => {
    if (!loginInputElement.value || !passwordInputElement.value || !nameInputElement.value) {
      alert("Проверьте оба поля  на заполненность");
      return
    }
    register({
      name: nameInputElement.value,
      login: loginInputElement.value,
      password: passwordInputElement.value,
    }).then(() => {
       renderLogin();
    })
  });


  const logButtonElement = document.getElementById("log-button");
  logButtonElement.addEventListener("click", () => {
    renderLogin();
  });
};