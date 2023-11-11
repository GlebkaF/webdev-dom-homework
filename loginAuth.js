import { login, setToken, token ,setUserName, } from "./api.js";
import { getApi, renderAll } from "./main.js";
import { renderReg } from "./renderReg.js";


export const renderLogin = () => {
    const appElement = document.getElementById("app")
    const loginHtml = `
    <div class="form">
      <h3 class="form-title">Форма входа</h3>
      <div class="form-row">
        <input type="text" id="login-input" class="add-form-name" placeholder="Логин" />
        <input
          type="text"
          id="password-input"
          class="add-form-name"
          placeholder="Пароль"
        />
      </div>
      <br />
      <button class="add-form-button" id="login-button">Войти</button>
      <a href="#" id="registration">Зарегистрироваться</a>
    </div>`;

    appElement.innerHTML = loginHtml;

    const buttonElementAuth = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");

    const linkRegistr = document.getElementById("registration");
    linkRegistr.addEventListener("click", () => {
        renderAll('reg');
    })

    buttonElementAuth.addEventListener("click", () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        })
            .then((responseData) => {
                setToken(responseData.user.token);
                setUserName(responseData.user.name);
                
            })
            .then(()=> {
                getApi();
            })
    })
}

