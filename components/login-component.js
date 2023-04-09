import { loginUser } from "../api.js";

export function renderLoginComponent({ appEl, commentHtml, setToken, getFetchPromise }) {

let isLoginMode = true;

const renderForm = () => {
    const appHtml = `
    <section id="loaderComments" class="loader -display-none">
    <h4 id="loaderText" class="text-loader">Комментарии загружаются...</h4>
    </section>
    <div class="container">
    <ul class="comments">
    <!-- список рендерится из js !!!!!!!-->
    ${commentHtml}
    </ul>
  
    <div class="add-form add-form--register">
      <h3>Чтобы добавить комментарий, авторизуйтесь</h3>
      <h3 class="form-title">Форма ${isLoginMode ? 'входа' : 'регистрации'}</h3>
      ${
        isLoginMode
        ? ""
        : `<input
        type="text"
        class="add-form-name"
        placeholder="Введите имя"
        rows="4"
        value = ""
        /><br/>`
      }
      
      <input
        type="text"
        class="add-form-login"
        placeholder="Введите логин"
        value=""
      /><br/>
      <input
        type="password"
        class="add-form-password"
        placeholder="Введите пароль"
        rows="4"
        value = ""
      ></input>
     
      <div class="add-form-row">
      <button class="login-form-button">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
      <button class="toggle-form-button">Перейти ${isLoginMode ? 'к регистрации' : 'ко входу'}</button>
      </div>
    </div>`;

    appEl.innerHTML = appHtml;

    document.querySelector('.login-form-button').addEventListener('click', () => {
        // setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
        const login = document.querySelector('.add-form-login').value;
        const password = document.querySelector('.add-form-password').value;

        if (!login) {
            alert('Введите логин');
            return;
        }
        if (!password) {
            alert('Введите пароль');
            return;
        }

        loginUser({
            login: login,
            password: password,
        }).then((user) => {
            // console.log(user);
            setToken(`Bearer ${user.user.token}`);
            getFetchPromise();
        }).catch(error => {
            alert(error.message)
        });
    });

    document.querySelector('.toggle-form-button').addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        renderForm();
    });
};
renderForm();
}