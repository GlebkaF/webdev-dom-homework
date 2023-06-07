import { fetchLogin } from "./api.js";
import { renderComments } from "./renderComments.js";

export const renderLogin = (app, isInitialLoading, isWaitingComment, comments, callback, user) => {
    let isAuthMode = true;

    const renderForm = () => {
        app.innerHTML = `
        <div class="registration">
            <div class="add-form">
            <h3>${isAuthMode ? 'Форма входа' : 'Форма регистрации'}</h3>
                <div class="reg-input">
                ${isAuthMode ? '' : `
                    <input type="text"
                    id="add-name"
                    class="add-name"
                    placeholder="Введите имя"
                    />`
            }
                  <input type="text"
                    id="add-login"
                    class="add-login"
                    placeholder="Введите логин"
                    />
                  <input
                    type="password"
                    id="add-password"
                    class="add-password"
                    placeholder="Введите пароль"
                    </>
                </div>
                <div class="add-reg-form">
                  <button
                  type="button"
                  id="auth-button"
                  class="auth-button">${isAuthMode ? 'Войти' : 'Зарегистрироваться'}</button>
                  <button id="reg-button" class="reg-button">${isAuthMode ? 'Зарегистрироваться' : 'Войти'}</button>
                </div>
            </div>
        </div>
    `

        document.getElementById("reg-button")
            .addEventListener('click', (event) => {
                console.log("кнопка работает");
                event.preventDefault();

                isAuthMode = !isAuthMode;

                renderForm();
            });

        const authButton = document.getElementById("auth-button");
        authButton.addEventListener("click", () => {
            const login = document.getElementById("add-login").value;
            const password = document.getElementById("add-password").value;
            fetchLogin(login, password)
                .then((response) => {
                    renderComments(app, isInitialLoading, isWaitingComment, comments, callback, response.user);
                });
        })
    }
    renderForm();
}
