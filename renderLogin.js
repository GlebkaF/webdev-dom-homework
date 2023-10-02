import { changeLogin, changeToken, changeUserName } from "./globalVariables.js";
import { loginUser } from "./API.js";
import { getData } from './utilities.js';

export const renderLogin = () => {
    let conteinerHtml = document.querySelector('.container');

    conteinerHtml.innerHTML = `<div class="login-form">
    <p class="login-form__text">Форма входа</p>
    <input type="text" class="login-form__login" placeholder="Введите логин" />
    <input type="password" class="login-form__password" placeholder="Введите пароль" />
    <button class="login-form__button">Войти</button>
    <button class="login-form__link">Зарегистрироваться</button>
</div>`;

    let loginButton = document.querySelector('.login-form__button');

    loginButton.addEventListener('click', () => {
        let loginInput = document.querySelector('.login-form__login').value;
        let passwordInput = document.querySelector('.login-form__password').value;
        loginUser({ loginInput, passwordInput })
            .then((responseJson) => {
                if (responseJson.error) {
                    alert(responseJson.error);
                }
                changeUserName(responseJson.user.name);
                changeToken(responseJson.user.token);
                changeLogin(loginInput);
                getData();
            });
    });
}