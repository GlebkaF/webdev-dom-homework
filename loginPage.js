import { login, setToken, token } from "./api.js";

export const renderLogin = () => {
    const appElement = document.getElementById("app");
    const loginHtml = `
    <div class="container">
    <div class="form">
      <h3 class="form-title">Форма входа</h3>
      <div class="form-row">
        <input type="text" id="login-input" class="input" placeholder="Логин" />
        <input
          type="text"
          id="password-input"
          class="input"
          placeholder="Пароль"
        />
      </div>
      <br />
      <button class="button" id="login-button">Войти</button>
    </div>
    </div>
    `
    appElement.innerHTML = loginHtml;

    const buttonElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");

    buttonElement.addEventListener("click", () => {
    login({
        login: loginInputElement.value,
        password: passwordInputElement.value
    }).then((responseData) => {
        setToken(responseData.user.token);
        console.log(token);
    }).then(() => {
        fetchAndRenderComments();
    })
    
});
};

