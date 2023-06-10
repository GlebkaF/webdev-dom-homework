import { loginUser, registrUser, getAllComments } from '../api.js'

export function renderLoginComponent({ appEl, setToken, getAllComments }) {
  let isLoginMode = true;

  const renderForm = () => {
    const appHtml = `
    <div class="container">
      <div id="block-form-login" class="login-form">
      <h3 class="form-title">Форма ${isLoginMode ? 'входа' : 'регистрации'}</h3>
      ${isLoginMode ? '' :       `<input id="name-login-input" type="text" class="add-form-name" placeholder="Введите ваше имя" />
      <br/>`}
        <input id="login-input" type="text" class="add-form-name" placeholder="Введите ваш логин" />
        <br/>
        <input id="password-input" type="password" class="add-form-name" placeholder="Введите ваш пароль" />
        <div class="login-form-row">
          <button id="login-button" class="login-form-button">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
        </div>
        <div class="login-form-row">
        <button id="toggle-button" class="login-form-button">Перейти ${isLoginMode ? 'к регистрации' : 'ко входу'}</button>
      </div>
      </div>
    </div>`;

  appEl.innerHTML = appHtml;

  document.getElementById('login-button').addEventListener('click', () => {
    if(isLoginMode) {
      const login = document.getElementById('login-input').value
      const password = document.getElementById('password-input').value
  
  
      if (!login) {
        alert('Введите логин')
        return;
      }
      if (!password) {
        alert('Введите пароль')
        return;
      }
  
  
      loginUser({
        login: login,
        password: password,
      }).then((user) => {
        setToken(`Bearer ${user.user.token}`);
        getAllComments();
      }).catch(error => {
        //TODO: выводить alert красиво
        alert(error.message);
      });
    } else {
      const login = document.getElementById('login-input').value
      const name = document.getElementById('password-input').value
      const password = document.getElementById('password-input').value
      if (!name) {
        alert('Введите имя')
        return;
      }
    
      if (!login) {
        alert('Введите логин')
        return;
      }
      if (!password) {
        alert('Введите пароль')
        return;
      }
  
  
      registrUser({
        login: login,
        password: password,
        name: name,
      }).then((user) => {
        setToken(`Bearer ${user.user.token}`);
        getAllComments();
      }).catch(error => {
        //TODO: выводить alert красиво
        alert(error.message);
      });
    }


  });

  document.getElementById('toggle-button').addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    renderForm();
  });
  }
  renderForm();
}