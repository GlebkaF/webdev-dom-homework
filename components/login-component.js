import { loginUser } from "../API.js";

export function renderLoginComponent({appEl, setToken, getFetchFunction}) {
    const appHtml =
        `<div class="container">
        <div class="add-form">
        <h3 class="add-form-title">Форма входа</h3>
        <input
            type="text"
            id ="login-input"
            class="add-form-login"
            placeholder="Введите логин"
        /> <br>
        <input
            type="password"
            id ="password-input"
            class="add-form-password"
            placeholder="Введите пароль"
        ></input>
        <div class="add-form-login_button">
            <button id = "login-button" class="add-form-button_login">Войти</button>
        </div>
        </div>`;

    appEl.innerHTML = appHtml;
    document.getElementById('login-button').addEventListener('click', () => {

        loginUser({
            login: "admin",
            password: "admin",
        }).then((user) => {
            console.log(user);
            setToken(`Bearer ${user.user.token}`);
            getFetchFunction();
        });
    })
}