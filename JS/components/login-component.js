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

            loginToApp({
                login: "admin",
                password: "admin",
            }).then((user) => {
                setToken(`Bearer ${user.user.token}`);
                getFromApi(newComments);
            })
        });
    });
};