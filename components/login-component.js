import { loginUser } from "../api.js";

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

        const login = document.getElementById("login-input").value;
        const password = document.getElementById("password-input").value;

        if (!login) {
            alert("Введите логин")
            return
        };

        if (!password) {
            alert("Введите пароль")
            return
        };


        loginUser({
            login: login,
            password: password
        }).then((user) => {
            setToken(`Bearer ${user.user.token}`);
            fetchUsersAndRender();
        }).catch(error => {
            alert(error.message)
        })
    })
    });
}