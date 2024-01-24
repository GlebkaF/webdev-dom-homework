import { login, setToken, token } from "./api.js";

const appElement = document.querySelector('.app')

export const renderLogin = ({ fetchAndRenderComments }) => {
    const loginHTML = `<h1>Страница входа</h1>
    <div class="form">
      <h3 class="form-title">Форма входа</h3>
      <div class="form-row">
        <input type="text" class="input login-input" placeholder="Логин" />
        <input
          type="text"
          class="input password-input"
          placeholder="Пароль"
        />
      </div>
      <br />
      <button class="button login-button">Войти</button>
    </div>`
    appElement.innerHTML = loginHTML;
};

export function loginButtonListerner () {
  const loginButtonElement = document.querySelector('.login-button');
  const loginInputElement = document.querySelector('.login-input');
  const passworInputElement = document.querySelector('.password-input');

  loginButtonElement.addEventListener('click', () => {
      login({ 
          login: loginInputElement.value,
          password: passworInputElement.value,
      }).then((responseData) => {
          console.log(responseData);
          setToken(responseData.user.token);
          console.log(token);
      }).then((token) => {
        if(token = true) {
          appElement.style.display = 'none';
          document.querySelector('.link').style.display = 'none';
        };
      }).then(() => {
        fetchAndRenderComments();
      })
  });
};



