import { getPromise, addLogin } from "../api.js";

export function renderLoginComponents({ appEl, setToken }) {
  let isLoginMode = true;

  const renderForm = () => {
    const appHtml = `
  <div class="container">
      <div class="add-form" id="form">
        <h2>Форма для ${isLoginMode ? "входа" : "регистрации"}</h2>
        ${
          isLoginMode
            ? ""
            : `Имя
        <input
          type="text"
          class="user__name"
          placeholder="Введите имя"
          id="username" /><br>`
        }
        
        Логин
        <input
          type="text"
          class="user__login"
          placeholder="Введите логин"
          id="login" /><br>
        Пароль
        <input
          type="password"
          class="user__password"
          placeholder="Введите пароль"
          rows=""
          id="password"></input>
        <div class="add-form-row">
          <button class="add-form-button" id="login-button">${
            isLoginMode ? "Войти" : "Зарегистрироваться"
          }</button><br>

          <button class="add-form-button" id="toggle-button">Перейти${
            isLoginMode ? " к регистрации" : " к авторизации"
          }</button>
        </div>`;

    appEl.innerHTML = appHtml;

    document.getElementById("login-button").addEventListener("click", () => {
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
      addLogin(login, password)
        .then((user) => {
          console.log(user);
          console.log(user.user);
          setToken(`Bearer ${user.user.token}`);
          getPromise();
        })
        .catch((error) => {
          alert(error.massage);
        });
    });

    document.getElementById("toggle-button").addEventListener("click", () => {
      isLoginMode = !isLoginMode;
      renderForm();
    });
  };

  renderForm();
}
