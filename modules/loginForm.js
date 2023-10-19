import { registerForm } from "./registerForm.js";
import { login } from "./authApi.js";
import { setUser } from "./userStore.js";
import { render } from "./app.js";

export const loginForm = () => {
  const container = document.querySelector('.container');
  container.innerHTML = `
                            <div class="enter-form">
                                <h2>Форма входа</h2>
                                <input type="text" class="enter-login" placeholder="Введите ваше имя" />
                                <input type="password" class="enter-password" placeholder="Введите ваш пароль" />
                                
                                <button class="enter-button">Войти</button>
                                <button class="enter-register-button">Зарегистрироваться</button>
                            </div>`
  init();
}


const init = () => {
  const log = document.querySelector('.enter-button');
  const reg = document.querySelector('.enter-register-button');
  log.addEventListener('click', userLogin);
  reg.addEventListener('click', registerForm);
}


const userLogin = () => {
  const user = document.querySelector('.enter-login').value;
  const password = document.querySelector('.enter-password').value;
  if (user === '' || password === '') {
    alert('я не могу отправить запрос, если поле не заполнено');
    return;
  }
  login(user, password).then(res => {
    const user = res.user;
    if (user) {
      setUser(user);
      render();
    }
  }).catch(() => {
    alert('Неверный пользователь или пароль');
    return;
  })
}


