import { userAuthorization, userRegistration } from "./api.js";

export const renderLogin = ({appEl, setToken, initApp}) => {
    let isLoginMode = true;
    // const renderForm = () => {
        const appHtml = `<div class="container-registr" id="container-registr">
        <div>
          <div class="add-form">Форма ${isLoginMode ? 'входа' : 'регистрации'}
          ${isLoginMode ? '' : `
          <input 
          type="text"
          class="add-form-namelogin"
          id = "user-name"
          placeholder="Введите имя"
        />
        `}
            <input
              type="text"
              class="add-form-login"
              id = "login"
              placeholder="Введите логин"
            />
            <input
              type="password"
              class="add-form-password"
              id = "password"
              placeholder="Введите пароль"
            />
            <div class="add-form-registration">
              <button class="add-form-button-registration-activ-registr" id="activ-registr">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
            </div>
            <div class="add-form-enter" id="toggle">${isLoginMode ? 'Зарегистрироваться' : 'Войти'}</div>
          </div>`;
        appEl.innerHTML = appHtml;
        document.getElementById("activ-registr").addEventListener("click", () => {
            if (isLoginMode) {
                const login = document.getElementById("login").value;
                const password = document.getElementById("password").value;
                if (!login) {
                    alert("Введите верный логин")
                    return;
                }
                if (!password) {
                    alert("Введите верный пароль")
                    return;
                }
                  userAuthorization({
                    login: login,
                    password: password,
                })
                .then((user) => {
                    setToken(`Bearer ${user.user.token}`);
                    initApp();
                })
                .catch(error =>  {
                    alert(error.message);
                });
            } else {
                const userName = document.getElementById("user-name").value;
                const login = document.getElementById("login").value;
                const password = document.getElementById("password").value;
                if (!userName) {
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
                  userRegistration({
                    login: login,
                    password: password,
                    name: name,
                })
                .then((user) => {
                    setToken(`Bearer ${user.user.token}`);
                    initApp();
                })
                .catch(error =>  {
                    alert(error.message);
                });
            }
          });
          document.getElementById("toggle").addEventListener("click", () => {
            let isLoginMode = !isLoginMode;
            
          })
    //       renderForm();
    // }
    
}