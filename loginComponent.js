import { loginUser } from "./api.js";
import { renderApp } from "./renderComments.js";

export function renderLoginComponent({ appElement, token, commentsListElement, getListComments, user }) {
    let isLoginMode = true;
    let isRegistered = false;

    const renderForm = () => {
        const registerHtml = `
            <div class="comment loginForm">
            ${isLoginMode
                ? ''
                : `
            <input type="text" id="name-input" class="input" placeholder="Имя" />
            <br>`} 
            <input type="text" id="login-input" class="input" placeholder="Логин" />
            <br>
            <input type="password" id="password-input" class="input" placeholder="Пароль" />
            <br>
            <button class="loginButton" id="login-button">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
            <br>
            <button class="toggleButton" id="togle-button">${isLoginMode ? 'Зарегистрироваться' : 'Войти с логином'}</button>
            </div>
             </div>
            `;

        appElement.innerHTML = registerHtml;

        document.getElementById('togle-button').addEventListener('click', () => {
            isLoginMode = !isLoginMode;
            renderForm();
        });

        document.getElementById('login-button').addEventListener('click', (token) => {
            const login = document.getElementById('login-input').value;
            const password = document.getElementById('password-input').value;

            if (!login) {
                alert('Введите логин');
                return;
            };

            if (!password) {
                alert('Введите пароль');
                return;
            }

            loginUser({
                login: login,
                password: password,
            }).then((user) => {
                token = `Bearer ${user.user.token}`;
                isRegistered = true;

                appElement.innerHTML = `
                    <ul class="comments" id="commentsList">
                    </ul>
                    <div id="newCommentForm">
                    </div>
                    <div class="downloading">Комментарий загружается...</div>`;

                const commentsListElement = document.getElementById('commentsList');

                renderApp(commentsListElement, getListComments, token, isRegistered, user);
            });
        });
        return;
    }
    renderForm();
};