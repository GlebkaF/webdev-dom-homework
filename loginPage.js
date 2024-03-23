import { login, setToken, token } from "./api.js";

const buttonElement = document.getElementById("login-button");
const loginInputElement = document.getElementById("username");
const passwordInputElement = document.getElementById("password");

buttonElement.addEventListener("click", (event) => {
    event.preventDefault(); // предотвращаем стандартное поведение отправки формы
    login({
        login: loginInputElement.value,
        password: passwordInputElement.value,
    }).then((responseData) => {
        setToken(responseData.user.token); 
        console.log(token);
    })
});
