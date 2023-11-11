import { registration, setToken, setUserName, token } from "./api.js";
import { renderLogin } from "./loginAuth.js";
import { renderComments } from "./renderComments.js";
import { getApi, renderAll } from "./main.js";

export const renderReg=() => {
    const appElement = document.getElementById("app");

    const regHtml = `
    <div class="form">
      <h3 class="form-title">Форма регистрации</h3>
      <div class="form-row">
      <input id="reg-name-input" type="text" class="add-form-name" placeholder="Введите имя"/>
        <input type="text" id="reg-login-input" class="add-form-name" placeholder="Введите логин" />
        <input
          type="text"
          id="reg-password-input"
          class="add-form-name"
          placeholder="Введите пароль"
        />
      </div>
      <br />
      <button class="add-form-button" id="register-button">Зарегистрироваться</button>
      <a href="#" id="autorization">Войти</a>
    </div>`;

    appElement.innerHTML = regHtml;

    const loginPage = document.getElementById("autorization");
    loginPage.addEventListener("click", () => {
        renderAll('auth')
    });

const nameRegInput = document.getElementById("reg-name-input");
const loginRegInput = document.getElementById("reg-login-input");
const passwordRegInput = document.getElementById("reg-password-input");

const regButtonElement = document.getElementById("register-button");

regButtonElement.addEventListener("click", () =>{
    registration({
        name: nameRegInput.value,
        login: loginRegInput.value,
        password: passwordRegInput.value,
    })
    .then((responseData) => {
        setToken(responseData.user.token);
        setUserName(responseData.user.name);
        })
        .then(() => {
           renderAll();
        })
})
}