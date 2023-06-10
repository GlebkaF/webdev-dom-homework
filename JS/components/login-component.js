import { getFromApi, newComments } from "../api.js";
import { getAuthForm, getCommentsAndAuth } from "../appHtml.js";
import { isInitialLoadingFunc } from "../renderApp.js";

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
            setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
            getFromApi(newComments);
        });
    });
};