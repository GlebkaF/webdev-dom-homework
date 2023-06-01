'use strict';

import { loginUser, regUser } from "./api.js";

// ------------- Обрабатываем форму авторизации пользователя ----------

export function renderLogin({ appElement, setToken, fetchAndRender }) {
  let isLoginMode = false;

  // ------------ Рендерим форму авторизации --------------------------

  const renderForm = () => {
    const appHtml = ` 
        <div class="login">
        <div class="login-content">
        <p class="login-title">${
          isLoginMode ? "Авторизация" : "Регистрация"
        }</p>
        <span class="login-field">Логин</span><input id="login-input" class="login-input" type="text">
        <br>
        <span class="login-field">Пароль</span><input id="password-input" class="login-input" type="password" >
        <br>
        ${
          isLoginMode
            ? ""
            : `<span class="login-field">Имя</span><input id="name-input" class="login-input" type="text" >`
        }
        <button id="login-button" class="login-button">${
          isLoginMode ? "Войти" : "Зарегистрироваться"
        }</button>
        <button id="reg-button" class="registration-button">${
          isLoginMode ? "Перейти к регистрации" : "Перейти ко входу"
        }</button>
        </div>
    </div>`;

    appElement.innerHTML = appHtml;

// ----------- Обрабатываем форму авторизации / регистрации ---------

    document.getElementById("login-button").addEventListener("click", () => {
      const login = document.getElementById("login-input").value;
      const password = document.getElementById("password-input").value;
      if (isLoginMode) {
        if (!login) {
          alert("Введите логин");
          return;
        }
        if (!password) {
          alert("Введите пароль");
        }

        loginUser({
          login: login,
          password: password,
        })
          .then((user) => {
            setToken(`Bearer ${user.user.token}`);
            fetchAndRender();
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        const login = document.getElementById("login-input").value;
        const password = document.getElementById("password-input").value;
        const name = document.getElementById("name-input").value;
        if (!name) {
            alert("Введите имя");
            return;
          }
          if (!login) {
            alert("Введите логин");
            return;
          }
  
          if (!password) {
            alert("Введите пароль");
            return;
          }
  
        regUser({
            login: login,
            password: password,
            name: name,
          })
            .then((user) => {
              setToken(`Bearer ${user.user.token}`);
              fetchAndRender();
            })
            .catch((error) => {
              alert(error.message);
            });
        }
      });

    document.getElementById("reg-button").addEventListener("click", () => {
      isLoginMode = !isLoginMode;
      renderForm();
    });
  };
  renderForm();
}