//Здесь раполагается логика формы входа
// Далее начинаем рендерить форму с сылкой для авторизации если токен отсутствует, если токен присутствует то рендерим форму для добавления комментария
import { loginTodo } from "./api.js";
import { renderUserComments } from "./renderComments.js";

export const renderLoginComponent = ({ setToken }) => {
    let isLoginMode = true;
    const appEl = document.getElementById("app"); // Объявили константу в которую будет загружаться конечный код

    const renderForm = () => {
        const loginHtml = `
        <div class="container">
            <div class="add-form" id="addForm">
                <p class="add-form-header"> Форма ${isLoginMode ? 'входа' : 'регистрации'}</p> 
                ${isLoginMode ? '' : '<input type="text" class="add-form-name" placeholder="Введите имя" id="enter-name">'}
                <input type="text" class="add-form-login" placeholder="Введите логин" id="enter-login">
                <input type="password" class="add-form-password" placeholder="Введите пароль" rows="4" id="enter-password"></input>
                <button class="add-form-button" id="btn">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
                <br>
                <a class="registration" id="toggle-button" href="#">Перейти ${isLoginMode ? 'к регистрации' : 'ко входу'} </a>
            </div>
        </div>
        `;

        appEl.innerHTML = loginHtml;

        document.getElementById("btn").addEventListener("click", () => {
            loginTodo({
                login: document.getElementById("enter-login").value,
                password: document.getElementById("enter-password").value,
            }).then((user) => {
                setToken(`Bearer ${user.user.token}`);
                console.log(user.user.token) // Проверяем токен
                renderUserComments();
            });
        })

        document.getElementById("toggle-button").addEventListener("click", () => {
            isLoginMode = !isLoginMode;
            renderUserComments();
            renderForm();
        })
    };
    renderForm();
}
