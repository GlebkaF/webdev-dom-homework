import { login, setToken, registration, token } from "./api.js";
import { fetchAndRenderComments, globalAdd } from "../main.js";
import { appComment } from "./ui.js";

export const initRenderLoginForm = () => {
    const containerFormsElement = document.querySelector('div[class="containerForms"]');
    containerFormsElement.innerHTML = `<p class="comment-header">Чтобы добавить комментарий,&nbsp;<span id="enter-link" style="text-decoration: underline; cursor: pointer">авторизуйтесь</span></p>`;
    const enterLinkElement = document.getElementById("enter-link");


    const enterFormHTML = `<div class="enter-form" id="enter-form">
    <p class="enter-form-header"><b>Форма входа</b></p>
    <input type="text" class="enter-form-name" id="enter-form-login" placeholder="Введите логин" />
    <input type="text" class="enter-form-name" id="enter-form-password" placeholder="Введите пароль" />
    <div class="enter-form-row">
    <button class="enter-form-button" id="enter-form-button">Войти</button>
    <p class="enter-form-link" id="enter-form-link">Зарегистрироваться</p>
    </div>`;


    const registFormHTML = `</div>
    <div class="regist-form" id="regist-form">
    <p class="regist-form-header"><b>Форма регистрации</b></p>
    <input type="text" class="regist-form-name" id="regist-form-login" placeholder="Введите логин" />
    <input type="text" class="regist-form-name" id="regist-form-name" placeholder="Введите имя" />
    <input type="text" class="regist-form-name" id="regist-form-password" placeholder="Введите пароль" />
    <div class="regist-form-row">
    <button class="regist-form-button" id="regist-form-button">Зарегистрироваться</button>
    <p class="regist-form-link" id="regist-form-link">Войти</p>
    </div>
    </div>`;


    function loadLoginForm() {
        appComment.style.display = 'none';
        containerFormsElement.innerHTML = enterFormHTML;

        const enterFormButton = document.getElementById("enter-form-button");

        const loginInputElement = document.getElementById("enter-form-login");
        const passwordInputElement = document.getElementById("enter-form-password");
        
        enterFormButton.addEventListener("click", () => {
            login({
                login: loginInputElement.value,
                password: passwordInputElement.value,
            })
            .then((responseData) => {
                setToken(responseData.user.token);
                console.log(responseData);
            })
            .then(() => {
                appComment.style.display = 'flex';
                fetchAndRenderComments();
                globalAdd();
            })
            
            .catch((error) => {
                if (error.message === "Плохой запрос") {
                    alert("Введен неправильный логин или пароль, скорректируйте ввод");
                    return;    
                } else {
                    alert("Кажется, у вас сломался интернет, попробуйте позже");
                }
                console.warn(error);
            });
        });

        const enterRegistLink = document.getElementById("enter-form-link");
        enterRegistLink.addEventListener("click", () => {
            loadRegisterForm();
        });

    };


    function loadRegisterForm() {
        containerFormsElement.innerHTML = registFormHTML;

        const registFormButton = document.getElementById("regist-form-button");

        const loginInputElement = document.getElementById("regist-form-login");
        const nameInputElement = document.getElementById("regist-form-name");
        const passwordInputElement = document.getElementById("regist-form-password");

        registFormButton.addEventListener("click", () => {
            registration({
                login: loginInputElement.value,
                name: nameInputElement.value,
                password: passwordInputElement.value,                
            })
            .then((responseData) => {
                setToken(responseData.user.token);

            })
            .then(() => {
                appComment.style.display = 'flex';
                fetchAndRenderComments();
                globalAdd();
            })
            .catch((error) => {
                if (error.message === "Плохой запрос") {
                    alert("Пользователь с таким логином уже сущетсвует, скорректируйте ввод");
                    return;    
                } else {
                    alert("Кажется, у вас сломался интернет, попробуйте позже");
                }
                console.warn(error);
            });
        })


        const registEnterLink = document.getElementById("regist-form-link");
        registEnterLink.addEventListener("click", () => {
            loadLoginForm();
        });
    };


    enterLinkElement.addEventListener("click", () => {
        loadLoginForm();
    });
    
}