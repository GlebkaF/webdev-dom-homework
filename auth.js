import { fetchPromise } from "./api.js";
import {tokenAuth,  addForm, nameInputElement } from "./constants.js";

const loginHtml =`<div class="login__wrapper">
    <div class="login">
    <form>
      <input id="login"></input>
      <input id="passwd"></input>
    </form>
    <button id="auth_button">Войти</button>
    <button id="login_button">Зарегестрироваться</button>
    </div>
  </div>`

export const pageLogin = () => {
  toAuthForm.addEventListener("click", () => {
  const listElement = document.getElementById("list");
  listElement.innerHTML = loginHtml;
  toAuthForm_wrapp.innerHTML = ''
  pageRegistration()
  auth()
  })
}

const auth = () => {
  const auth_button = document.getElementById("auth_button");
  const login = document.getElementById("login");
  const passwd = document.getElementById("passwd");
  auth_button.addEventListener("click", () => {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
      method: "POST",
        body: JSON.stringify({
          "login": login.value,
          "password": passwd.value,
        })
      })  
      .then((responce) => {
        if (responce.status == 201) {
          return responce.json()
        } else {
          throw new Error('Неправильный логин')
        }
      })    
      .then((responceData) => {
        addForm.style.display = "flex"
        fetchPromise()
        tokenAuth.push(responceData.user.token)
        nameInputElement.value = responceData.user.name
      })
      .catch(() => {
        alert('Неправильный логин/пароль')
      })
  })

}

const pageRegistration = () => {
  const login_button = document.getElementById("login_button");
  login_button.addEventListener("click", () => {
    const commentsHtml =`<div class="login__wrapper">
    <div class="login">
    <form>
      <input id="login"></input>
      <input id="passwd"></input>
      <input id="passwd2"></input>
    </form>
    <button id="auth_button">Войти</button>
    <button>Зарегестрироваться</button>
    </div>
  </div>`
  const listElement = document.getElementById("list");
  listElement.innerHTML = commentsHtml;
  pageLoginonBtn()
  })
}

const pageLoginonBtn = () => {
  const auth_button = document.getElementById("auth_button");
  auth_button.addEventListener("click", () => {
  const listElement = document.getElementById("list");
  listElement.innerHTML = loginHtml;
  pageRegistration()
  auth()
  })
}