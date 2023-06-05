import { loginUser, registerUser } from "../api.js";
export function renderLoginComponent(element, fetchAndRender) {
  let isLoginMode = true;
  const renderForm = () => {
    const loginHTML = `
    <div class="login-form" id="loginForm">
    <h2 class= "title">Форма ${isLoginMode ? 'входа' : 'регистрации'}</h2>
    ${isLoginMode ? "" : '<input type="text" class="login-form-input" placeholder="Введите ваше имя" id="name" />'}
    <input type="text" class="login-form-input" placeholder="Введите логин" id="login" />
    <input type="password" class="login-form-input" placeholder="Введите пароль" id="password" />
    <div class="login-form-row">
      <a href="#" id = "toggle-link" class="link">${isLoginMode ? 'Перейти к регистрации' : 'Вернуться к авторизации'}</a>
      <button id="loginButton" class="login-button">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
    </div>
  </div>`
    element.innerHTML = loginHTML;

    document.getElementById("loginButton").addEventListener("click", () => {
      const login = document.getElementById("login").value;
      const password = document.getElementById("password").value;
      if (!login) {
        alert("Введите логин");
        return;
      }

      if (!password) {
        alert("Введите пароль");
        return;
      }

      if (isLoginMode) {
        loginUser({
          login: login,
          password: password,
        })
          .then((userData) => {
            localStorage.setItem('user', JSON.stringify(userData.user));
            fetchAndRender();
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        const name = document.getElementById("name").value;
        if (!name) {
          alert("Введите имя");
          return;
        }
        // if (!login) {
        //   alert("Введите логин");
        //   return;
        // }

        // if (!password) {
        //   alert("Введите пароль");
        //   return;
        // }

        registerUser({
          login: login,
          name: name,
          password: password,
        })
          .then((user) => {
            localStorage.setItem('user', JSON.stringify(userData.user));
            fetchAndRender();
          })
          .catch((error) => {
            alert(error.message);
          });

      }
    });
    document.getElementById("toggle-link").addEventListener('click', () => {
      isLoginMode = !isLoginMode;
      renderForm();
    });
  };
  renderForm();
}