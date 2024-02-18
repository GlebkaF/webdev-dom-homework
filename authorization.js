import { authorizationRequest, registrationRequest, token, setToken } from './api.js';



const startAuthorizationElement = document.getElementById("start-authorization");
const authorizationInvisibleElement = document.getElementById("authorization-invisible");
const addFormInvisibleElement = document.getElementById("add-form-invisible");
const formAuthorizationElement = document.getElementById("form-authorization");
//const loginInputElement = document.getElementById("login-input");
//const passwordInputElement = document.getElementById("password-input");
const nameInputElement = document.getElementById("name-input");



export function authorization() {
  const authorizationFormHtml = `<div class="add-form authorization" id="">
      <p class="authorization">Форма входа</p>
      <input type="text" class="add-form-text" id="login-input" placeholder="Введите ваш логин (не менее 3-х знаков)" />
      <input type="text" class="add-form-text" id="password-input" placeholder="Введите ваш пароль (не менее 3-х знаков)" />
      <button class="add-form-button" id="authorization-button">Войти</button>
      <p class="authorization" id="authorization-click">Зарегистрироваться</p>
    </div>`;
  ;
  formAuthorizationElement.innerHTML = authorizationFormHtml;
  authorizationInvisibleElement.classList.add("loading-none");
  addFormInvisibleElement.classList.add("loading-none");

  const authorizationClickElement = document.getElementById("authorization-click");
  authorizationClickElement.addEventListener('click', registration);

  const authorizationButtonElement = document.getElementById("authorization-button");
  authorizationButtonElement.addEventListener('click', authorizationEntrance);

}
startAuthorizationElement.addEventListener('click', authorization);


function authorizationEntrance() {
  //const loginInputElement = document.getElementById("login-input");
 // const passwordInputElement = document.getElementById("password-input");
 authorizationRequest(/*{
    login: loginInputElement.value,
    password: passwordInputElement.value,
  }*/);
  
  authorizationInvisibleElement.classList.remove("loading-none");
  addFormInvisibleElement.classList.remove("loading-none");
  startAuthorizationElement.classList.add("loading-none");
  formAuthorizationElement.classList.add("loading-none");
}





//const authorizationButtonElement = document.getElementById("authorization-button");

function registration() {
  const authorizationFormHtml = `<div class="add-form authorization" id="">
      <p class="authorization">Форма регистрации</p>
      <input type="text" class="add-form-text" id="name-input" placeholder="Введите ваше имя (не менее 3-х знаков)" />
      <input type="text" class="add-form-text" id="login-input" placeholder="Введите ваш логин (не менее 3-х знаков)" />
      <input type="text" class="add-form-text" id="password-input" placeholder="Введите ваш пароль (не менее 3-х знаков)" />
      <button class="add-form-button" id="registration-button">Зарегистрироваться</button>
      <p class="authorization" id="registration-click">Войти</p>
    </div>`;
  ;
  formAuthorizationElement.innerHTML = authorizationFormHtml;
  authorizationInvisibleElement.classList.add("loading-none");
  addFormInvisibleElement.classList.add("loading-none");

  const registrationClickElement = document.getElementById("registration-click");
  registrationClickElement.addEventListener('click', authorization);

  const registrationButtonElement = document.getElementById("registration-button");
  registrationButtonElement.addEventListener('click', registrationEntrance);
}
//authorizationButtonElement.addEventListener('click', registration);




function registrationEntrance() {
  //const NameInputElement = document.getElementById("name-input");
    //const loginInputElement = document.getElementById("login-input");
   // const passwordInputElement = document.getElementById("password-input");
  registrationRequest(/*{
    login: loginInputElement.value,
    name: NameInputElement.value,
    password: passwordInputElement.value,
  }*/);
  authorizationInvisibleElement.classList.remove("loading-none");
  addFormInvisibleElement.classList.remove("loading-none");
  startAuthorizationElement.classList.add("loading-none");
  formAuthorizationElement.classList.add("loading-none");
}