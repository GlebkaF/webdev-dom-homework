
import { loginUser, registerUser } from "./api.js";

export const renderLoginComponent = ({ appEl, initApp }) => {
  let isLoginMode = true;
  const renderForm = () => {
    const appHtml = `
    <div class="form">
    <h3 class="add-form">Форма ${isLoginMode ? "входа" : "регистрации"}</h3>
    ${isLoginMode ? ""
        :
        `<input type="text" class="form-name" 
      placeholder="Введите имя" id="name" />`}

    <input type="text" class="form-name"
     placeholder="Введите логин" id="login"></input>
    <input type="password" class="form-name" 
    placeholder="Введите пароль" rows="4" id="password"></input>

    <div class="form-row">
      <button id="active-registr" class="form-button">${isLoginMode ? "Войти" : "Зарегистрироваться"}</button>
      <a id="signUp" class="form-registr" href="#">${isLoginMode ? "Зарегистрироваться" : "Войти"}</a>
    </div>
  </div>
  `
    appEl.innerHTML = appHtml;
    document.getElementById("active-registr").addEventListener("click", () => {
      if (isLoginMode) {
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;
        if (!login) {
          alert("Введите логин");
          return;
        }
        if (!password) {
          alert("Введите пароль");
          return;
        } loginUser({
          login: login,
          password: password,
        })
          .then((user) => {
            initApp();
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        const name = document.getElementById("name").value;
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;

        if (!name) {
          alert("Введите имя")
          return;
        }
        if (!login) {
          alert("Введите логин")
          return;
        }
        if (!password) {
          alert("Введите пароль")
          return;
        }
        registerUser({
          login: login,
          password: password,
          name: name,
        })
          .then((user) => {
            initApp();
          })
          .catch(error => {
            alert(error.message);
          })
      }
    });
    document.getElementById("signUp").addEventListener("click", () => {
      isLoginMode = !isLoginMode;
      renderForm();
    })
  }
  renderForm();
};
