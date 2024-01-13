import { registration, setName } from "./api.js";

export const renderRegistration = ({ fetchAndRenderComments }) => {
    const appElement = document.getElementById("app");
    const registrationHtml = `
    <div class="container">
    <div class="add-form">
    <p class="heading">Форма регистрации</p>
      <div class="input">
        <input type="text" readonly id="name-input" class="add-form-input" placeholder="Введите имя" />
        <input type="text" id="login-input" class="add-form-input" placeholder="Введите логин" />
        <input
          type="text"
          id="password-input"
          class="add-form-input"
          placeholder="Введите пароль"
        />
      </div>
      <br />
      <button class="add-form-login-button" id="registration-button">Зарегистрироваться</button>
      <br />
      <a href="login.html" class="link">Войти</a>
    </div>
    </div>
    `;
    appElement.innerHTML = registrationHtml;
    const registrationButtonElement = document.getElementById(
        "registration-button",
    );
    const nameInputElement = document.getElementById("name-input");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");

    registrationButtonElement.addEventListener("click", () => {
        //   console.log(5);
        //   console.log(`{
        //   name: nameInputElement.value,
        //   login: loginInputElement.value,
        //   password: passwordInputElement.value,
        // }`);
        registration({
            name: nameInputElement.value,
            login: loginInputElement.value,
            password: passwordInputElement.value,
        })
            .then((responseData) => {
                console.log(responseData.user.name);
                setName(responseData.user.name);
                console.log(responseData.user.name);
            })
            .then(() => {
                fetchAndRenderComments();
            });
    });
};
