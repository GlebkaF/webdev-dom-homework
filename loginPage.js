import { login, setToken, token } from "./api.js";
import { fetchAndRenderComments } from "./fetch.js";

export const authorization = () => {
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
      <a href="#" class="reg-link">Зарегистрироваться</a>
    </div>
    </div>
    `
    appElement.innerHTML = loginHtml;

    const registrationLink = document.querySelector(".reg-link");
    const loginButtonElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");
    const nameInputElement = document.getElementById("name-input");

    loginButtonElement.addEventListener("click", () => {
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

  registrationLink.addEventListener("click", () => {
  const regHtml = `
    <div class="container">
    <div class="form">
      <h3 class="form-title">Форма регистрации</h3>
      <div class="form-row">
        <input type="text" id="name-input" class="input" placeholder="Придумайте Имя" />
        <input type="text" id="login-input" class="input" placeholder="Придумайте Логин" />
        <input
          type="text"
          id="password-input"
          class="input"
          placeholder="Придумайте Пароль"
        />
      </div>
      <br />
      <button class="button" id="reg-button">Зарегистрироваться</button>
      <a href="#" class="login-link">Войти</a>
    </div>
    </div>
    `
    appElement.innerHTML = regHtml;
  });

  const regButtonElement = document.getElementById("reg-button");
  const loginLink = document.querySelector(".login-link");
  regButtonElement.addEventListener("click", () => {
    postRegistration({
        login: loginInputElement.value,
        name: nameInputElement.value,
        password: passwordInputElement.value
    }).then((responseData) => {
        setToken(responseData.user.token);
        console.log(token);
    }).then(() => {
        fetchAndRenderComments();
    })
  })
  loginLink.addEventListener("click", () => {
    authorization();
  });
}




