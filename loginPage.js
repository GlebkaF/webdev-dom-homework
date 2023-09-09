import { login, setToken, token } from "./api.js";

export const renderLogin = ({ fetchAndRenderTasks }) => {
    const appElement = document.getElementById('app');
    const loginHtml = `
	<div class="add-form">
		<h2 class="login-title">Форма входа</h2>
		<input type="text" id="login-login" placeholder="Введите логин" value="" />
		<input type="password" id="login-password" placeholder="Введите ваш пароль">
		<button id="login-btn">Войти</button>
		<a class="login-link" href="index.html">Перейти на стр комментариев</a>
		<!-- <a class="login-link" href="index.html">Зарегистрироваться</a> -->
	</div>
	`;

    appElement.innerHTML = loginHtml;


    const buttonElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");

    buttonElement.addEventListener('click', () => {
        console.log('1');
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            console.log(token);
            setToken(responseData.user.token);
            console.log(token);
        }).then(() => {
            fetchAndRenderTasks();
        })
    });
}