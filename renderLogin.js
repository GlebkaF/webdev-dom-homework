import { login, setLoading, setToken } from "./api.js";
import { renderReg } from "./renderReg.js";

export const renderLogin = ({ fetchGetAndRenderComments }) => {
  const appElement = document.getElementById("app");
  const loginHTML = `
    <div id="login-form" class="add-form">
    <h3 class="form-title">Форма входа</h3>
      <input
        id="login-input"
        type="text"
        class="add-form-login"
        placeholder="Логин"
      />
      <input
        id="password-input"
        type="password"
        class="add-form-pass"
        placeholder="Пароль"
      ></input>
      <div class="add-form-row">
        <button id="login-button" class="add-form-button">Войти</button>
      </div>
      <div id="reg-link" class="reg-link">Зарегистрироваться</div>
    </div>
    `;
  appElement.innerHTML = loginHTML;

  const regLinkEl = document.getElementById("reg-link");
  regLinkEl.addEventListener("click", () => {
    renderReg({ fetchGetAndRenderComments });
  });

  const ButtonElement = document.getElementById("login-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");

  ButtonElement.addEventListener("click", () => {
    login({      
      login: loginInputElement.value,
      password: passwordInputElement.value,
    })
      .then((responseData) => {
        setToken(responseData.user.token);
        localStorage.setItem('token', responseData.user.token);
        return responseData;
      })
      .then((responseData) => {
        if (responseData.status === "Cannot read properties of undefined (reading 'user')") {
          throw new Error("Нет авторизации");
        }
        return responseData;
      })
      .then((responseData) => {
        localStorage.setItem('user', responseData.user.name);
        setLoading(false);
        fetchGetAndRenderComments();
      })
      .catch((error) => {
        if (error.message === "Нет авторизации") {
          console.warn(error);
        }
      });
  });
};
