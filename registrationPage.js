/*import { reg, registration, setReg } from "./api";
import { fetchAndRenderComments } from "./main";

export const renderRegistration = () => {
    const formElement = document.getElementById("form");
    const registrationHtml =` 
    <div class="container">
    <div class="add-form">
    <h1 class="form">Форма регистрации</h1>
    <input
      type="text" id="login-input"
      class="add-form-name-login"
      placeholder="Введите имя"
    />
    <br>
    <input
      type="text" id="password-input"
      class="add-form-name-password"
      placeholder="Введите логин"
    />
      <br/>
      <input
      type="text" id="password-input"
      class="add-form-name-password"
      placeholder="Введите пароль"
    />
      <br/>
      <p id="login">Регистрация</p>
      <button class="button" id="login-button">Войти</button>
    </div>`;
    
     formElement.innerHTML = registrationHtml;

     buttonElement.addEventListener("click", () => {
        registration({
            name: nameInputElement.value,
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            console.log(reg);
            setReg(responseData.user.reg);
            console.log(reg);
        })
        .then(() => {
            fetchAndRenderComments();
        })
     });
};*/

 
