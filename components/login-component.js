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
        setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k")
        fetchUsersAndRender();
    })
    });
}