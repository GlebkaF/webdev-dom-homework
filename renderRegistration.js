import { renderLogin } from "./renderLogin.js";
import { registrate } from "./listeners.js";

export const renderRegistration = () => {
    let conteinerHtml = document.querySelector('.container');

    conteinerHtml.innerHTML = `<div class="reg-form">
    <p class="reg-form__text">Форма регистрации</p>
    <input type="text" class="reg-form__name" placeholder="Введите имя" />
    <input type="text" class="reg-form__login" placeholder="Введите логин" />
    <input type="text" class="reg-form__password" placeholder="Введите пароль" />
    <button class="reg-form__button">Зарегистрироваться</button>
    <button class="reg-form__login-button">Войти</button>
</div>`;

    let loginButton = document.querySelector('.reg-form__login-button');
    let regButton = document.querySelector('.reg-form__button');

    regButton.addEventListener('click', registrate);
    loginButton.addEventListener('click', renderLogin);
}