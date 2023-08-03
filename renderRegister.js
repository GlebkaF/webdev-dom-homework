import { renderLogin } from "./renderLogin.js";
import { getTodo, setUser } from "./main.js";
import { registerNewUser } from "./api.js";

export function renderRegister() {
  const appElement = document.getElementById("login-app");

  const registerHtml = `
    <div class="container">
        <div class="enter-form">
            <h2>Форма регистрации</h2>
            <input
            id="user-name-input"
            type="text"
            class="enter-form-login"
            placeholder="Введите имя"
          />
          <input
            id="login-input"
            type="text"
            class="enter-form-login"
            placeholder="Введите логин"
          />
          <input
            id="password-input"
            type="password"
            class="enter-form-password"
            placeholder="Введите пароль"
          ></input>
          <div class="enter-form-row">
            <button id="register-button" class="enter-form-button">Зарегистрироваться</button>
          </div>
          <div class="enter-form-text">
            <a id="enter-link" class="enter-form-link">Войти</a>
          </div>
        </div>
      </div>
    `;

  appElement.innerHTML = registerHtml;

  const enterLink = document.getElementById("enter-link");
  const registerButton = document.getElementById("register-button");

  registerButton.addEventListener("click", () => {
    const login = document.getElementById("login-input").value;
    const name = document.getElementById("user-name-input").value;
    const password = document.getElementById("password-input").value;
    
    if (!name || !login || !password) {
      alert("Заполнены не все поля")
    }

    registerNewUser({
      login: login,
      name: name,
      password: password,
    }).then((user) => {
      console.log(login);
      setUser(user.user);
    })
    .then(() => {
      renderLogin({ getTodo });
    })
  });

  enterLink.addEventListener("click", () => {
    renderLogin({ getTodo });
  });
}
