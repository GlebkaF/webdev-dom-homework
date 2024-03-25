import { login, setUser } from "./api.js";
import { renderPeoples } from "./renderPeoples.js";
import { peoples } from "./main.js";

export const renderLogin = () => {
    const container = document.querySelector('.container');

    const loginHtml = `
    <div class="container">
        <div class="login-form">
            <h2>Авторизуйтесь:</h2>
            <form>
                <div class="form-group">
                    <input type="text" id="username" name="username" class="login-input" placeholder="Введите ваш логин" required>
                </div>
                <div class="form-group">
                    <input type="password" id="password" name="password" class="login-input" placeholder="Введите ваш пароль" required>
                </div>
                <div class="form-group">
                    <button id="login-button">Войти</button>
                </div>
            </form>
        </div>
    </div>`;

    container.innerHTML = loginHtml;  
    
    const buttonElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("username");
    const passwordInputElement = document.getElementById("password");

    buttonElement.addEventListener("click", (event) => {
        event.preventDefault(); // предотвращаем стандартное поведение отправки формы
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            setUser(responseData.user); 
            renderPeoples(peoples);
        })
    });
};
