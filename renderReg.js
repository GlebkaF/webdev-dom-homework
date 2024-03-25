import { renderLogin } from "./renderLogin.js";

export const renderReg = ({ fetchGetAndRenderComments }) => {
    const appElement = document.getElementById("app");
    const regHTML = `
    <div id="reg-form" class="add-form">
    <h3 class="form-title">Форма регистрации</h3>
      <input
        id="name-input"
        type="text"
        class="add-form-login"
        placeholder="Введите имя"
      />
      <input
        id="login-input"
        type="text"
        class="add-form-pass"
        placeholder="Введите логин"
      />
      <input
        id="password-input"
        type="password"
        class="add-form-pass"
        placeholder="Введите пароль"
      ></input>
      <div class="add-form-row">
        <button id="reg-button" class="add-form-button">Зарегистрироваться</button>
      </div>
      <div id="login-link" class="login-link">Войти</div>
    </div>
    `;
    appElement.innerHTML = regHTML;

    const loginLinkEl = document.getElementById("login-link");
    loginLinkEl.addEventListener("click", () => {
        renderLogin({ fetchGetAndRenderComments });
    });

    const ButtonElement = document.getElementById("reg-button");
    const nameInputElement = document.getElementById("name-input");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");

    ButtonElement.addEventListener("click", () => {
        return fetch("https://wedev-api.sky.pro/api/user", {
            method: "POST",
            body: JSON.stringify({
                login: loginInputElement.value.trim(),
                name: nameInputElement.value.trim(),
                password: passwordInputElement.value,
            }),
        })
            .then((response) => {
                if (response.status === 400) {
                    throw new Error("Пользователь существует");
                }
                return response;
            })
            .then((response) => {
                return response.json();
            })
            .then(() => {
                alert("Успешная регистрация")
                fetchGetAndRenderComments();
            })
            .catch((error) => {
                if (error.message === "Пользователь существует") {
                    alert("Пользователь с таким логином существует");
                    console.warn(error);
                }
            });
    })

}