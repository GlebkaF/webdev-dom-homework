import { appElement, formElement } from "../main.js";
import { login, setToken, token } from "./api.js";
import { fetchGet } from "./fetchGet.js";
import { renderRegistration } from "./registrationPage.js";

export const renderLogin = ({ listElement, listElementData }) => {
    for (const loginPageElement of document.querySelectorAll('.link-login-page')) {
        loginPageElement.addEventListener('click', () => {
            const loginHtml = `
            <div class="add-form">
            <h3>Форма входа</h3>
            <input type="text" class="add-form-login" id="login-input" placeholder="Введите логин">
            <input type="text" class="add-form-password" id="password-input" placeholder="Введите пароль">
            <button class="add-form-button" id="button-login">Войти</button>
            <a href="#" class="link" id="link-registration">Зарегистрироваться</a>
            </div>
            `;

            appElement.innerHTML = loginHtml;

            listElement.style.display = "none";
            for (const loaderElement of document.querySelectorAll('.loader')) {
                loaderElement.style.display = "none";
            }

            const buttonElement = document.getElementById("button-login");
            const loginInputElement = document.getElementById("login-input");
            const passwordInputElement = document.getElementById("password-input");

            buttonElement.addEventListener("click", () => {
                login({
                    login: loginInputElement.value,
                    password: passwordInputElement.value,
                })
                    .then((responseData) => {
                        console.log(token);
                        setToken(responseData.user.token);
                        console.log(token);
                    })
                    .then(() => {
                        fetchGet({ listElementData });
                        appElement.style.display = "none";
                        listElement.style.display = "flex";
                        formElement.style.display = "flex";

                    })
            })
            
            const linkElement = document.getElementById("link-registration");
            
            linkElement.addEventListener("click", () => {
                renderRegistration({ listElement, listElementData });
            })
        })
    }
};

