import { login, loginButtonDisable } from "./listeners.js";
import { renderRegistration } from "./renderRegistration.js";

export const renderLogin = () => {
    let conteinerHtml = document.querySelector('.container');

    conteinerHtml.innerHTML = `<div class="login-form">
    <p class="login-form__text">Форма входа</p>
    <input type="text" class="login-form__login" placeholder="Введите логин" />
    <input type="password" class="login-form__password" placeholder="Введите пароль" />
    <button class="login-form__button">Войти</button>
    <button class="login-form__reg-button">Зарегистрироваться</button>
</div>`;

    let loginButton = document.querySelector('.login-form__button');
    let regButton = document.querySelector('.login-form__reg-button');
    let loginLogin = document.querySelector('.login-form__login');
    let loginPassword = document.querySelector('.login-form__password');

    loginButtonDisable();

    loginLogin.addEventListener('input', loginButtonDisable);
    loginPassword.addEventListener('input', loginButtonDisable);

    loginButton.addEventListener('click', login);
    regButton.addEventListener('click', renderRegistration);
}