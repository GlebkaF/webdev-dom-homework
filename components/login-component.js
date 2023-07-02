import { loginUser, registerUser } from "../api.js";

export function renderLoginComponent({ comments, appEL, setToken, getArr }) {

    let isLoginMode = true

    const commentHtml = comments.map((comment, index) => {

        return `
        <li class="comment" data-index="${index}">
    <div class="comment-header">
      <div>${comment.name}</div>
      <div>${comment.eachDate}</div>
    </div>
    <div class="comment-body">
      <div class="${comment.isEdit ? 'display-none' : 'comment-text'}">
        ${comment.text}
      </div>
    </div>
    <div>
    <textarea type="textarea" class="${comment.isEdit ? 'add-form-text' : 'display-none'}" rows="4">${comment.text}</textarea>
    </div>
    <div class="comment-footer">
      <div class="redact">
        <button class="${comment.isEdit ? 'display-none' : 'redact-button'}" data-index="${index}">Редактировать</button>
      </div>    
      <div class="redact">
        <button class="${comment.isEdit ? 'save-button' : 'display-none'}" data-index="${index}">Сохранить</button>
      </div>      
      <div class="likes">
        <span class="likes-counter">${comment.like}</span>
        <button class="${comment.classLike}" data-index="${index}"></button>
      </div>
    </div>
  </li>`;
    }).join("");

    const appHtml =  `<div class="container">
    <ul class="comments" id="list">
    ${commentHtml}
    </ul>
    <div class ="text" >Чтобы добавить комментарий, <a  id="login-link" class="form-link" href="#">авторизуйтесь</a></div>
    </div>`;

    appEL.innerHTML = appHtml;

    document.getElementById('login-link').addEventListener('click', () => {
        const renderForm = () => {
            const appHtml = `
            <div class="container">
    <div class="login-form" id="login-form">
    <h3 class="form-title">Форма ${isLoginMode ? "входа" : "регистрации"}</h3>
    <br>
    ${isLoginMode ? "" : `<input type="text" class="login-form-input" placeholder="Введите ваше имя" id="enter-form-name" />`}
    <input type="text" class="login-form-input" placeholder="Введите логин" id="enter-form-login" />
    <input type="password" class="login-form-input" placeholder="Введите пароль" id="enter-form-password" />
    <div class="login-form-row">
      <button class="login-form-button" id="enter-button">${isLoginMode ? "Войти" : "Зарегистрироваться"}</button>
      <a  class="register-link" href="#">${isLoginMode ? "Зарегистрироваться" : "Войти"}</a>  
    </div>
    </div>
    </div>`;
            appEL.innerHTML = appHtml;

            document.querySelector('.register-link').addEventListener('click', () => {
                isLoginMode = !isLoginMode;
                renderForm();
            });

            document.getElementById("enter-button").addEventListener("click", () => {
                if (isLoginMode) {
                    const login = document.getElementById('enter-form-login').value;
                    const password = document.getElementById('enter-form-password').value;

                    if (!login) {
                        alert('Введите логин');
                        return;
                    }
                    if (!password) {
                        alert('Введите пароль');
                        return;
                    }
                    loginUser({
                        login: login,
                        password: password,
                    })
                        .then((user) => {
                            console.log(user);
                            setToken(`Bearer ${user.user.token}`);
                            console.log(setToken);
                            getArr();
                        })
                        .catch((error) => {

                            if (error.message === "Сервер сломался") {
                                alert("Сервер сломался, попробуйте позже");
                                getArr();
                            } else if (error.message === "Нет авторизации") {
                                alert(error.message);
                            } else {
                                alert('Кажется, у вас сломался интернет, попробуйте позже');
                                console.log(error);
                            }
                        });
                } else {
                    const name = document.getElementById('enter-form-name').value;
                    const login = document.getElementById('enter-form-login').value;
                    const password = document.getElementById('enter-form-password').value;

                    if (!name) {
                        alert('Введите имя');
                        return;
                    }
                    if (!login) {
                        alert('Введите логин');
                        return;
                    }
                    if (!password) {
                        alert('Введите пароль');
                        return;
                    }
                    registerUser({
                        login: login,
                        password: password,
                        name: name,
                    })
                        .then((user) => {
                            console.log(user);
                            setToken(`Bearer ${user.user.token}`);
                            console.log(setToken);
                            getArr();
                        })
                        .catch((error) => {

                            if (error.message === "Сервер сломался") {
                                alert("Сервер сломался, попробуйте позже");
                                getArr();
                            } else if (error.message === "Нет авторизации") {
                                alert(error.message);
                            } else {
                                alert('Кажется, у вас сломался интернет, попробуйте позже');
                                console.log(error);
                            }
                        });
                }

            });
        }
        renderForm();

    });

}