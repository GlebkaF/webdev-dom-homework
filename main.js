import { dataFormat } from "./formatDate.js";
import { getComments, postComment, login, token, setToken } from "./api.js";
import { renderComments } from "./renderComments.js";


const buttonElement = document.querySelector('.add-form-button');
const nameElement = document.querySelector('.add-form-name');
const textElement = document.querySelector('.add-form-text');
const hederLoadElement = document.querySelector('.loader');
let comments = [];

// Функция GET для API
const fetchAndRenderComments = () => {
    getComments()
        .then((responseData) => {
            // Преобразование данных из формата api в формат приложения

            const appComments = responseData.comments.map((comment) => {
                return {
                    // Достаем имя автора
                    name: comment.author.name,
                    // Преобразовываем дату-строку в Date
                    time: dataFormat(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    // Заглушка для признака лайкнутости
                    icon: false,
                };
            });
            comments = appComments;
            hederLoadElement.classList.add('disableLoader');
            renderComments(comments);

        })

};

fetchAndRenderComments();


// Деактивация кнопки если значения не введены
const disableButton = () => {
    if (nameElement.value && textElement.value) {
        buttonElement.disabled = false;
    }
    else {
        buttonElement.disabled = true;
    }
};
nameElement.addEventListener("input", disableButton);
textElement.addEventListener("input", disableButton);

const loginElement = document.getElementById("login");

const loginHtml = `<a class="login-link" href="#" id="link-to-in">Чтобы добавить комментарий, авторизуйтесь </a>`;

loginElement.innerHTML = loginHtml;



const loginAutoriz = () => {
    let loginLinkButton = document.getElementById("link-to-in");
    loginLinkButton.addEventListener('click', () => {
        const autorizationFormHtml = `
        <div class="add-form"> Форма входа
            <br>
            <input id="login-input" type="text" class="add-form-name add-login" placeholder="Логин" />
            <br>
            <input id="pass-input" type="text" class="add-form-name add-pass" placeholder="Пароль" />
            <button id="add-form-login" class="add-form-button">Войти</button>
            <a class="login-link" href="#" id="link-to-login">Зарегистрироваться</a>
        </div>`;

        loginElement.innerHTML = autorizationFormHtml;

        const loginButton = document.getElementById("add-form-login");
        const loginInputElement = document.getElementById("login-input");
        const passwordInputElement = document.getElementById("pass-input");

        loginButton.addEventListener('click', () => {
            login({
                login: loginInputElement.value,
                password: passwordInputElement.value,
            }).then((responseData) => {
                setToken(responseData.user.token);
                nameElement.value = responseData.user.name;
                loginElement.innerHTML = ` `;
            });

        });


        const registrationLinkButton = document.getElementById("link-to-login");
        registrationLinkButton.addEventListener('click', () => {

            const registrationFormHtml = `
                <div class="add-form"> Форма регистрации
                    <input type="text" class="add-form-name add-login" placeholder="Имя" />
                    <br>
                    <input type="text" class="add-form-name add-login" placeholder="Логин" />
                    <br>
                    <input type="text" class="add-form-name add-pass" placeholder="Пароль" />
                    <button class="add-form-button">Зарегистрироваться</button>
                    <a class="login-link" href="#" id="link-to-in">Войти</a>
                </div>`;

            loginElement.innerHTML = registrationFormHtml;
            loginAutoriz();
        });

    });

};

loginAutoriz();

// Форма добавления нового комментария в ленту
buttonElement.addEventListener('click', () => {

    postComment({ fetchAndRenderComments });

});

