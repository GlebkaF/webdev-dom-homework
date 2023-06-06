import {initApp} from "./main.js";
export const renderLogin = ({appEl, setToken, initApp}) => {
    const appHtml = `<div class="container-registr" id="container-registr">
    <div>
      <div class="add-form">Форма регистрации
        <input 
          type="text"
          class="add-form-namelogin"
          placeholder="Введите имя"
        />
        <input
          type="text"
          class="add-form-login"
          placeholder="Введите логин"
        />
        <input
          type="password"
          class="add-form-password"
          placeholder="Введите пароль"
        />
        <div class="add-form-registration">
          <button class="add-form-button-registration-activ-registr" id="activ-registr">Зарегистрироваться</button>
        </div>
        <div class="add-form-enter">Войти</div>
      </div>`;
    appEl.innerHTML = appHtml;
    document.getElementById("activ-registr").addEventListener("click", () => {
          setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k")
        initApp();
      });
}