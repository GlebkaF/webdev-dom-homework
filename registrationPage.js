import { registration } from "./api.js";
import { renderLogin } from "./loginPage.js";


export const renderRegistration = () => {
    const formElement = document.getElementById("app");
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
      <button class="button" id="registration-action">Зарегистрироваться</button>
      <p class="reg" id="return-login-form">Войти</p>
    </div>`;
    
     formElement.innerHTML = registrationHtml;
     const buttonElement = document.getElementById("registration-action");
     buttonElement.addEventListener("click", () => {
        registration({
            name: nameInputElement.value,
            login: loginInputElement.value,
            password: passwordInputElement.value,
        
        })
        .then(() => {
            renderLogin();
        })
     });

     const returnLoginForm = document.getElementById("return-login-form");
     returnLoginForm.addEventListener("click", () => {
      renderLogin();
     })

};

 
