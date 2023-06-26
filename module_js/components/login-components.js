import { getPromise, addLogin } from "../api.js";

export function renderLoginComponents({ appEl, setToken, }) {
  const appHtml = `
  <div class="container">
      <div class="add-form" id="form">
        <h2>Форма для авторизации</h2>
        <input
          type="text"
          class="user__login"
          placeholder="Введите логин"
          id="login" />
        <input
          type="password"
          class="user__password"
          placeholder="Введите пароль"
          rows=""
          id="password"></input>
        <div class="add-form-row">
          <button class="add-form-button" id="login-button">Войти</button>
        </div>`;

  appEl.innerHTML = appHtml;

  document.getElementById("login-button").addEventListener("click", () => {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value

    if(!login) {
      alert('Введите логин')
      return;
    }

    if(!password) {
      alert('Введите пароль')
      return;
    }
    addLogin(login, password).then((user) => {
      console.log(user);
      console.log(user.user);
      setToken(`Bearer ${user.user.token}`);
      getPromise();
    }).catch(error => {
      alert(error.massage)
    })
  });
}
