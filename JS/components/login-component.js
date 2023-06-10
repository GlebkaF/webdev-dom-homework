import { getFromApi, newComments } from "../api.js";
import { getAuthForm, getCommentsAndAuth } from "../appHtml.js";
import { isInitialLoadingFunc } from "../renderApp.js";
import { loginToApp } from "../user-api.js";

export function renderLoginComponent({ appHtml, appElement, commentsHtml, setToken }) {
    appHtml = getCommentsAndAuth(commentsHtml);
    appElement.innerHTML = appHtml;

    const loadingComments = document.querySelector('.loading');
    const authLink = document.getElementById('auth-link');

    isInitialLoadingFunc(loadingComments);

    authLink.addEventListener("click", () => {
        appHtml = getAuthForm();
        appElement.innerHTML = appHtml;

        const loginBtn = document.getElementById('login-button');

        loginBtn.addEventListener("click", () => {
            const login = document.getElementById('login-input').value;
            const password = document.getElementById('password-input').value;

            if (!login) {
                alert("Вы не ввели логин")
                return;
            };

            if (!password) {
                alert("Вы не ввели пароль")
                return;
            };

            loginToApp({
                login: login,
                password: password,
            }).then((user) => {
                setToken(`Bearer ${user.user.token}`);
                getFromApi(newComments);
            }).catch((error) => {
                if (error.message === "Неверный логин или пароль") {
                    alert(error.message);
                }
            })
        });
    });
};