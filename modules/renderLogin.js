import { login, setToken, token } from "./api.js";

export const renderLogin = ({ fetchAndRenderComments }) => {
    const appElement = document.getElementById("app");
    const loginHtml = `
    <div class="container">
    <div class="add-form">
    <p class="heading">Форма входа</p>
      <div class="input">
        <input type="text" id="login-input" class="add-form-input" placeholder="Введите логин" />
        <input
          type="text"
          id="password-input"
          class="add-form-input"
          placeholder="Введите пароль"
        />
      </div>
      <br />
      <button class="add-form-login-button" id="login-button">Войти</button>
      <br />
      <a href="index.html" class="link">Зарегистрироваться</a>
    </div>
    </div>
    `;
    appElement.innerHTML = loginHtml;

    const loginButtonElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");

    loginButtonElement.addEventListener("click", () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        })
            .then((responseData) => {
                console.log(token);
                setToken(responseData.user.token);
                console.log(token);
            })
            .then(() => {
                fetchAndRenderComments();
            });
    });
};
