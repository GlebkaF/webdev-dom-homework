import { login, setToken, token } from "./api.js";
import { fetchAndRenderComments } from "./main.js";

// отрисовка формы входа
export const renderLogin = () => {
    const appElement = document.getElementById("app");
    const loginHtml =   `

<div class="container">
    <div id="log-form" class="add-form">
        <h3>Форма входа</h3>
        <input type="text" id="login-input" class"form-name" placeholder="Введите логин" /> 
        <input type="password" id="password-input" class="form-password" placeholder="Введите пароль" />
        <div class="add-form-row">
            <button id"log-button" class="log-form-button">Войти</button>
        </div>
    <a class="log" href="#">Зарегистрироваться</a>
    </div>
</div>
`;

appElement.innerHTML=loginHtml;

const buttonElement = document.getElementById("log-button");
const loginInputElement = document.getElementById("login-input");
const passwordInputElement = document.getElementById("password-input");

buttonElement.addEventListener("click",()=>{
    if (!loginInputElement.value || !passwordInputElement.value) {
        alert("Проверьте оба поля на заполненность");
        return
    }
    login({
        Login:loginInputElement.value, 
        password:passwordInputElenent.value,
    }).then((responseData)=>{
setToken(responseData.user.token);

    }).then(()=>{
        fetchAndRenderComments();
    })
});
};
