import { fetchLogin, fetchRegistration } from "./api.js";
import { saveUserInLocalStorage } from "./helpers.js";
import { commentsArray, fieldSubmit } from "./main.js";
import { renderComments } from "./render.js";


export const renderLogin = () => {
    const app = document.querySelector(".app");
    let loginMode = false;
    const render = () => {



        let loginHtml = ` <div class="login-form">
        <div class="input__style">
        ${loginMode ? '<input id="inputName" type="text" class="add-form-name" placeholder="Введите ваше имя" />' : ""}
        <input id="login" type="text" class="add-form-name" placeholder="Введите login" />
        <input id="password" type="password" class="add-form-text" placeholder="Введите ваш пароль"
        rows="4"></input>
        </div>
        <div class="add-form-row">
        <button id="buttonPush" class="login-button"> ${loginMode ? "Регистрация" : "Войти"}</button>
        <button id="buttonPush" class="mode-button">${!loginMode ? "Регистрация" : "Войти"}</button>
        </div>
    </div >`


        app.innerHTML = loginHtml;
        const loginButton = document.querySelector(".login-button");
        const modeButton = document.querySelector(".mode-button");

        loginButton.addEventListener('click', () => {
            if (!loginMode) {
                const loginInput = document.querySelector("#login").value
                const passwordInput = document.querySelector("#password").value
                if (!loginInput || !passwordInput) {
                    alert("Введите логин и пароль")
                    return

                }
                fetchLogin(loginInput, passwordInput).then(() => {


                    renderComments(commentsArray)



                }
                )

            } else {
                const loginInput = document.querySelector("#login").value
                const passwordInput = document.querySelector("#password").value
                const nameInput = document.querySelector("#inputName").value
                fetchRegistration(loginInput, passwordInput, nameInput).then(() => {
                    renderComments(commentsArray)
                })

            }
            
        })

        modeButton.addEventListener('click', () => {
            loginMode = !loginMode;
            render();

        })

    }
    render();

}