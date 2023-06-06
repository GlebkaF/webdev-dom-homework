import { fetchLogin } from "./api.js";
import { renderComments } from "./renderComments.js";

export const renderLogin = (app, isLoading, isWaitingComment, comments) => {
    app.innerHTML = `
        <div class="registration">
            <div class="add-form">
            <h3>Форма ввода</h3>
                <div class="reg-input">
                  <input type="text"
                    id="add-login"
                    class="add-login"
                    placeholder="Введите логин"
                    />
                  <input
                    type="text"
                    id="add-password"
                    class="add-password"
                    placeholder="Введите пароль"
                    </>
                </div>
                <div class="add-reg-form">
                  <button
                  type="button"
                  id="auth-button"
                  class="auth-button">Войти</button>
                  <button class="reg-button">Зарегистрироваться</button>
                </div>
            </div>
        </div>
    `
    const authButton = document.getElementById("auth-button");
    authButton.addEventListener("click", () => {
        const login = document.getElementById("add-login").value;
        const password = document.getElementById("add-password").value;
        fetchLogin(login, password)
            .then((response) => {
                renderComments(app, isLoading, isWaitingComment, comments, response.user);
            });
    })
}
