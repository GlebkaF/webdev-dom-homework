import { renderAddForm } from "./add-form.js";
import { login, setToken } from "./api.js";

export const authLink = document.getElementById("auth-button");
export function initAuthButtonListener() {
  authLink.addEventListener("click", () => {
    renderLogin();
    authLink.classList.add("hidden");
  })
};

export const renderLogin = () => {
    const appElem = document.getElementById("app");
    const loginHTML = `
    <div class="login-form">
        <input
          type="text"
          id="login-form-login"
          class="login-form-login"
          placeholder="Введите логин"
        />
        <input
          type="password"
          id="login-form-password"
          class="login-form-password"
          placeholder="Введите пароль"
        />
        <div class="login-form-row">
          <button id="login-form-button" class="login-form-button">
            Отправить
          </button>
        </div>
      </div>
    `;
    appElem.innerHTML = loginHTML;

const loginButton = document.getElementById("login-form-button");
const loginInp = document.getElementById('login-form-login');
const passwordInp = document.getElementById('login-form-password');




loginButton.addEventListener("click", () => {
    login(loginInp.value, passwordInp.value)
    .then((responseData) => {
        setToken(responseData.user.token);
        renderAddForm(responseData.user.name);
    })
});
}

