import { authorizedUser, loginUser, setToken } from "./api.js";
import { getFetch } from "../main.js";


export let isLoginMode = true;
export function renderLogin() {
  const loginHTML = `
    <div id="list" class="comments1">
    <div class="password">
     <h2 class="title"> Форма ${isLoginMode ? "Входа" : "Регистрации"}</h2>
     ${
       isLoginMode
         ? ""
         : `<input 
     type="text"
     class="name-input-authorization" id="name-input-authorization"
     placeholder="Имя"
    />`
     }</button>
     <div class="input-form">
     <br>   
            <input 
              type="text"
              class="login-input" id="login-input"
              placeholder="Логин"
            />
            <br>
            <input 
              type="text"
              class="password-input" id="password-input"
              placeholder="Пароль"
              rows="4"
            ></textarea>
            </div>



            <div class="add-form-row1">
              <button id="enter-button" class="enter-button" >${
                isLoginMode ? "Авторизоваться" : "Зарегистрироваться"
              }</button>
              <button id="signUp-button" class="enter-button" > ${
                isLoginMode ? "Зарегистрироваться" : "Назад к авторизации"
              }</button></button>
            </div> 
    </div>
    </div>
    
    `;
  const appElement = document.getElementById("app");

  appElement.innerHTML = loginHTML;

  document.querySelector(".enter-button").addEventListener("click", () => {
    if (isLoginMode) {
      const login = document.querySelector("#login-input").value;
      const password = document.querySelector("#password-input").value;

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
      }).then((user) => {
        setToken(`Bearer ${user.user.token}`);
        getFetch();
        // })
        // .catch((error) => {
        //   console.error(error.message);
      });
    } else {
      const login = document.querySelector("#login-input").value;
      console.log(login);
      const password = document.querySelector("#password-input").value;
      const name = document.querySelector("#name-input-authorization").value;
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

  document.getElementById("signUp-button").addEventListener("click", () => {
    isLoginMode = !isLoginMode;
    renderLogin();
  });
}
