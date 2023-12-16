import { register } from "../api.js";
import { navigateTo } from "../renderEngine.js";

const initHandlers = () => {
    const nameInput = document.querySelector('.register-form-name');
    const loginInput = document.querySelector('.register-form-login');
    const passwordInput = document.querySelector('.register-form-password');

    document.getElementById('register-form-button').addEventListener('click', async event => {
        await register(nameInput.value, loginInput.value, passwordInput.value)
        .then(() => navigateTo('startScreen'))
        .catch(error => alert(error.message));
    });

    const linksToLogin = document.querySelectorAll('.link-login');
    for(const link of linksToLogin){
        link.addEventListener('click', event => {
            event.preventDefault();
            navigateTo('login');
        });
    }
}

export const renderRegister = (afterRender) => {
    afterRender.then(initHandlers);
    
    return `<div class="container">
        <input
            type="text"
            class="register-form-name form-input"
            placeholder="Имя"          
        />
        <input
            type="text"
            class="register-form-login form-input"
            placeholder="Логин"          
        />
        <input
            type="text"
            class="register-form-password form-input"
            placeholder="Пароль"          
        />
        <button class="register-form-button form-button" id="register-form-button">Зарегистрироваться</button> 
        <div class="notification-block">
            Или <a href="" class="link link-login">войдите</a>
        </div>       
    </div>`;
};