import { appElement } from "../main.js";
import { renderLogin } from "./loginPage.js";

export const renderRegistration = ({ listElement, listElementData }) => {

    const registrationHtml = `
    <div class="add-form">
    <h3>Форма регистрации</h3>
    <input type="text" class="add-form-user-name" placeholder="Введите имя">
    <input type="text" class="add-form-login" placeholder="Введите логин">
    <input type="text" class="add-form-password" placeholder="Введите пароль">
    <button class="add-form-button">Зарегистрироваться</button>
    <a href="#" class="link link-login-page">Войти</a>
    </div>
    `;

    appElement.innerHTML = registrationHtml;  
    
    renderLogin({ listElement, listElementData });
};