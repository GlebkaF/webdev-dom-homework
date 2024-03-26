import { login } from "./api.js";


const buttonLoginElement = document.getElementById('log-button');
const loginInputElement = document.getElementById('login-input');
const passwordInputElement = document.getElementById('password-input');

buttonLoginElement.addEventListener('click', () => {
    login({
        login: loginInputElement.value,
        password: passwordInputElement.value,
    }).then((responseData) => {
        console.log(responseData);
    })
})