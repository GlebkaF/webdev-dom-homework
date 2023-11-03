import { login, setToken, token } from "./api.js";
import { fetchComments } from "./fetchComments.js";
import { renderComments } from "./renderComments.js";
import { comments } from "./fetchComments.js";

const loadingComment = document.querySelector(".loading-comment");

// loadingComment.style.display = "none";
// loadingComment.classList.add("hidden");

export const renderLogin = ({ fetchComments }) => {
  const appElement = document.getElementById("app");
  const loginHtml = `
    <div class="container">
    <div class="add-form">
      <h3 class="login-name">Форма входа</h3>
        <input id="login-input"
          type="text"
          class="add-form-name add-form-name-login"
          placeholder="Введите логин"
        />
        <textarea id="password-input"
          type="textarea"
          class="add-form-text add-form-text-login"
          placeholder="Введите пароль"
          rows="4"
          ></textarea>
        <div class="add-form-row add-form-row-login">
          <button id="login-button" class="add-form-button add-form-button-login">Войти</button>
        </div>
        <div class="login-link">
          <div id="registration">Зарегистрироваться</div>
        </div>
      </div>
  </div>`;

  appElement.innerHTML = loginHtml;

  const buttonElementLogin = document.getElementById("login-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");

  buttonElementLogin.addEventListener("click", () => {
    login({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    }).then((responseData) => {
      setToken(responseData.user.token);
      console.log(token);
      return responseData;
    }).then((responseData) => {
      renderComments({ comments, fetchComments, user:responseData });
    })
  })

  const reg = document.getElementById("registration");
  reg.addEventListener("click", () => {
    renderReg({ fetchComments });
  })
  // renderLogin({ fetchComments });
};

export const renderReg = ({ fetchComments }) => {
  const appElement = document.getElementById("app");
  const loginHtml = `
  <div class="container">
  <div class="add-form">
    <h3 class="login-name">Форма регистрации</h3>
    <input id="login-input"
    type="text"
    class="add-form-name add-form-name-login"
    placeholder="Введите имя"
  />
  <input id="login-input"
        type="text"
        class="add-form-text add-form-text-login"
        placeholder="Введите логин"
      />
      <textarea id="password-input"
        type="textarea"
        class="add-form-text add-form-text-login"
        placeholder="Введите пароль"
        rows="4"
        ></textarea>
      <div class="add-form-row add-form-row-login">
        <button id="login-button" class="add-form-button add-form-button-login">Зарегистрироваться</button>
      </div>
      <div class="login-link">
        <a class="login-link" href="index.html">Главная</a>
      </div>
    </div>
</div>`;

  appElement.innerHTML = loginHtml;

  const buttonElementLogin = document.getElementById("login-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");
  const loadingComment = document.querySelector(".loading-comment");

  buttonElementLogin.addEventListener("click", () => {
    login({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    }).then((responseData) => {
      console.log(token);
      setToken(responseData.user.token);
      // setUser(responseData.user.name);
      console.log(token);
    }).then(() => {
      fetchComments();
    }).then(() => {
      const loadingComment = document.querySelector(".loading-comment");
      loadingComment.classList.add("hidden");
    })
  })
};