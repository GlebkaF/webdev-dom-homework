import { container, getFetchPromise, setAuth } from "./main.js";
import { token } from "./main.js";
import { getRegistration } from "./getRegistration.js";
let isMode = true;



export function renderFormLogin() {

  const loginForm = `<div class="add-form" id="formUser">
    <h1>${isMode ? "Вход" : "Регистрация"}</h1>
    <div class="input-block"> 
    ${isMode ? "" : `<input type="text" id="nameUser" class="add-form-name" placeholder="Введите ваше имя" />`}
    <input type="text" id="login" class="add-form-name" placeholder="Введите ваш логин" />
    <input type="password" id="password" class="add-form-text" placeholder="Введите ваш пароль" rows="4"/>
    </div>
    <div class="add-form-row">
      <button id="button-login" class="add-form-button">${isMode ? "Вход" : "Зарегистрироваться"}</button>
      <button id="button-reg" class="add-form-button">${isMode ? "Регистрация" : "К форме входа"}</button>
    </div>
  </div>`;

  container.innerHTML = loginForm;

  const buttonLogin = document.getElementById("button-login");
  buttonLogin.addEventListener("click", () => {
    container.textContent = "Подождите, идет загрузка приложения";
    getRegistration({
      login: "admin",
      password: "admin"
    })
    .then((response) => {
      // console.log(response.user.token);
    })
    setAuth();
    getFetchPromise();
  });

  let buttonToggle = document.getElementById("button-reg");
  buttonToggle.addEventListener("click", () => {
    isMode = !isMode;
    renderFormLogin() 
  })

}