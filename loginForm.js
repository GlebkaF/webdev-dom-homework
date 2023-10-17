import { container, getFetchPromise, setAuth} from "./main.js";
import { getAuthorization } from "./getAuthorization.js";
import { getRegistr } from "./getRegistr.js";

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
 

  let buttonToggle = document.getElementById("button-reg");
  buttonToggle.addEventListener("click", () => {
    isMode = !isMode;
    renderFormLogin() 
  })
  if(isMode){
    buttonLogin.addEventListener("click", () => {
      const loginValue = document.getElementById("login");
      const passwordValue = document.getElementById("password");
      container.textContent = "Подождите, идет загрузка приложения";
      getAuthorization({
        login: loginValue.value,
        password: passwordValue.value,
      })
      .then(() => {
        setAuth();
        getFetchPromise();
      })
    });
  }else{
    buttonLogin.addEventListener("click", () =>{
      const reg = document.getElementById("nameUser");
      const loginValue = document.getElementById("login");
      const passwordValue = document.getElementById("password");
      container.textContent = "Подождите, идет загрузка приложения";
      getRegistr({
        login: loginValue.value,
        name: reg.value,
        password: passwordValue.value,
      })
      .then(() =>{
        setAuth();
        getFetchPromise();
      })
    })
  }
  

}