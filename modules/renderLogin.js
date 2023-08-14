import { login } from "./API_mod.js";
import { token, setToken } from "./API_mod.js";





export const renderLoging = () => {
    document.body.style.overflow = "hidden";
    const appElement = document.querySelector('.bg-container');


    const loginHtml = `
    <div class="bg-modal ">
        <div class="login-container">
            <h2 class="login-title">Регистрация</h2>
            <div class="login-form">
                <label for="username" class="login-label">Логин:</label>
                <input type="text" id="username" name="username" class="login-input" required>
                <label for="loginame" class="login-label">Имя</label>
                <input type="text" id="loginname" name="loginame" class="login-input" required>
                <label for="password" class="login-label">Пароль:</label>
                <input type="password" id="password" name="password" class="login-input" required>
                <button type="submit" class="login-button">Присоединиться</button>
            </div>
        </div>
    </div>`;


    appElement.innerHTML = loginHtml;

    const buttonSend = document.querySelector('.login-button');
    const loginPaste = document.getElementById('username');
    const passwordPaste = document.getElementById('password');


    buttonSend.addEventListener('click', () => {
        document.body.style.overflow = "overlay";
        login(loginPaste.value, passwordPaste.value)
            .then((responseData) => {
                return setToken(responseData.user.token)
            });

    })



}