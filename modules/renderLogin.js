import { authorizedUser, loginUser, setToken } from "./api.js";
import { getFetch } from "../main.js";

let isLoginMode = true;
export function renderLogin() {
  const loginHTML = `
    <div class="container">
    <div class="password">
     <h2 class="title"> Форма ${isLoginMode ? "Входа" : "Регистрации"}</h2>
     ${
       isLoginMode
         ? ""
         : `<input 
     type="text"
     class="login-input" id="name-input-authorization"
     placeholder="Имя"
    />`
     }</button>
            
            <input 
              type="text"
              class="login-input" id="login-input"
              placeholder="Логин"
            />
            <input 
              type="text"
              class="password-input" id="password-input"
              placeholder="Пароль"
              rows="4"
            ></textarea>
            <div class="add-form-row">
              <button id="enter-button" class="enter-button " >${
                isLoginMode ? "Войти" : "Зарегистрироваться"
              }</button>
              <button id="sugnUp-button" class="enter-button " >Перейти ${
                isLoginMode ? "К регистрации" : "Ко входу"
              }</button></button>
            </div> 
    
    </div>
    
    `;
  const appElement = document.getElementById("app");

  appElement.innerHTML = loginHTML;

  document.getElementById("enter-button").addEventListener("click", () => {
    if (isLoginMode) {
      const login = document.getElementById("login-input").value;
      const password = document.getElementById("password-input").value;

      if (!login) {
        alert("Введите логин");
        return;
      }

      if (!password) {
        alert("Введите пароль");
        return;
      }

      loginUser({
        login: login,
        password: password,
      })
        .then((user) => {
          console.log(user);
          setToken(`Bearer ${user.user.token}`);
          getFetch();
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      const login = document.getElementById("login-input").value;
      const password = document.getElementById("password-input").value;
      const name = document.getElementById("name-input-authorization").value;
      if (!login) {
        alert("Введите логин");
        return;
      }

      if (!password) {
        alert("Введите пароль");
        return;
      }
      if (!name) {
        alert("Введите имя");
        return;
      }

      authorizedUser({
        login: login,
        password: password,
        name: name,
      })
        .then((user) => {
          console.log(user);
          setToken(`Bearer ${user.user.token}`);
          getFetch();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  });

  document.getElementById("sugnUp-button").addEventListener("click", () => {
    isLoginMode = !isLoginMode;
    renderLogin();
  });
}
