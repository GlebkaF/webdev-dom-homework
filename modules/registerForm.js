import { loginForm } from "./loginForm.js";
import { register } from "./authApi.js";
import { setUser } from "./userStore.js";
import { render } from "./app.js";

export const registerForm = () => {
  const container = document.querySelector('.container');
  container.innerHTML = `<div class="register-form">
                                <h2>Форма регистрации</h2>
                                <input type="text" class="register-name" placeholder="Введите ваше имя" />
                                <input type="text" class="register-login" placeholder="Введите ваш логин" />
                                <input type="password" class="register-password" placeholder="Введите ваш пароль" />
                                
                                <button class="register-button">Зарегистрироваться</button>
                                <button class="register-enter-button">Войти</button>
                            </div>`;
  init();
}


const init = () => {
  const log = document.querySelector('.register-button');
  const reg = document.querySelector('.register-enter-button');
  log.addEventListener('click', nameUserLogin);
  reg.addEventListener('click', loginForm);
}


const nameUserLogin = () => {
  const name = document.querySelector('.register-name').value;
  const user = document.querySelector('.register-login').value;
  const password = document.querySelector('.register-password').value;
  if (user === '' || password === '' || name === '') {
    alert('я не могу отправить запрос, если поле не заполнено');
    return;
  }
  register(user, name, password).then(res => {
    const user = res.user;
    if (user) {
      setUser(user);
      render();
    }
  }).catch(() => {
    alert('пользователь с таким логином уже сущеcтвует');
    return;
  })
}
