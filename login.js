import { login, setToken } from "./API";

export const renderLogin = () => {
  const appElement = document.getElementById("app");
  const loginHTML = `
    <div class="containerRegister">
      <div class="add-formRegister">
        <input type="text" class="add-form-nameRegister" id="login-input" placeholder="Введите ваш логин" />
        <input type="password" class="add-form-textRegister" id="password-input" placeholder="Введите ваш пароль" />
        <div class="add-form-rowRegister">
          <button class="login-button" id="login-button">Вход</button>
        </div>
        <div class="add-form-rowRegister">
          <button class="register-button" id="register-button">Регистрация</button>
        </div>
      </div>
    </div>
  `;
  appElement.innerHTML = loginHTML;

  const buttonElement = document.getElementById("login-button");
  const registerButtonElement = document.getElementById("register-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");

  buttonElement.addEventListener("click", () => {
    const loginValue = loginInputElement.value;
    const passwordValue = passwordInputElement.value;

    if (!loginValue || !passwordValue) {
      alert("Введите логин и пароль");
      return;
    }

    login({ login: loginValue, password: passwordValue })
      .then((responseData) => {
        if (responseData.user && responseData.user.token) {
          setToken(responseData.user.token);
          window.location.href = "index.html";
        } else {
          alert("Ошибка входа. Проверьте правильность введенных данных.");
        }
      })
      .catch((error) => {
        alert(`Ошибка входа: ${error.message}`);
      });
  });

  registerButtonElement.addEventListener("click", () => {
    window.location.href = "register.html";
  });
};