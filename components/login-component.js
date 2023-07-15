import { login } from "../api.js";

export function renderLoginComponent({ appEl, setToken, fetchUsersAndRender, usersHtml }) {
    let appHtml = `
        <ul class="comments" id="comment-list">
        ${usersHtml}
        </ul>
        <div class="" id="go-to-login">
        <p>Чтобы добавить комментарий, <span>авторизуйтесь</span></p>
        </div>
        `
    appEl.innerHTML = appHtml;
    document.getElementById("go-to-login").addEventListener("click", () => {
    appHtml = `<div id="login">
            <div class="add-form">
            <h2 class="comment-header">Форма входа</h2>
            <input
                id="login-input"
                type="text"
                class="add-form-name"
                placeholder="Введите логин"
            />
            <br>
            <input
                id="password-input"
                type="password"
                class="add-form-name"
                placeholder="Введите пароль"
            />
            <div class="add-form-row">
                <button class="add-form-button" id="login-button">Войти</button>
            </div>
        </div>
        </div>`
    appEl.innerHTML = appHtml;
    document.getElementById("login-button").addEventListener("click", () => {

        login({
            login: "admin",
            password: "admin"
        }).then((user) => {
            setToken(`Bearer ${user.user.token}`);
            fetchUsersAndRender();
        })
    })
    });
}