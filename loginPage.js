import { login, setToken, token } from "./modules/api.js";



export const renderLogin = () => {    
    for (const loginPageElement of document.querySelectorAll('.link-login-page')){
        loginPageElement.addEventListener('click', () => {
            const appElement = document.getElementById("app");
            const loginHtml = `
            <div class="add-form">
            <h3>Форма входа</h3>
            <input type="text" class="add-form-login" id="login-input" placeholder="Введите логин">
            <input type="text" class="add-form-password" id="password-input" placeholder="Введите пароль">
            <button class="add-form-button" id="button-login">Войти</button>
            <a href="#" class="link">Зарегистрироваться</a>
            </div>
            `;
        
            appElement.innerHTML = loginHtml;
        
            const buttonElement = document.getElementById("button-login");
            const loginInputElement = document.getElementById("login-input");
            const passwordInputElement = document.getElementById("password-input");
        
            buttonElement.addEventListener("click", () => {
                console.log('кнопка');
                login({
                    login: loginInputElement.value,
                    password: passwordInputElement.value,
                })
                .then((responseData) => {
                    console.log(token);
                    setToken(responseData.user.token);
                    console.log(token);
                })
            })
        })
    }    
};

