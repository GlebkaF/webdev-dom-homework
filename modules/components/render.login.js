import { login } from "../api.js";
import { navigateTo } from "../renderEngine.js";

const initHandlers = () => {
    const loginInput = document.querySelector('.login-form-login');
    const passwordInput = document.querySelector('.login-form-password');

    document.getElementById('login-form-button').addEventListener('click', async event => {
        await login(loginInput.value, passwordInput.value)
        .then(() => navigateTo('startScreen'))
        .catch(error => alert(error.message));
    });

    const linksToRegister = document.querySelectorAll('.link-register');
    for(const link of linksToRegister){
        link.addEventListener('click', event => {
            event.preventDefault();
            navigateTo('register');
        });
    }
}


export const renderLogin = (afterRender) => {
    afterRender.then(initHandlers);
    
    return `<div class="container">
        <input
            type="text"
            class="login-form-login form-input"
            placeholder="Логин"          
        />
        <input
            type="text"
            class="login-form-password form-input"
            placeholder="Пароль"          
        />
        <button class="login-form-button form-button" id="login-form-button">Войти</button>
        <div class="notification-block">
            Или <a href="" class="link link-register">зарегистрируйтесь</a>
        </div>
    </div>`;
};