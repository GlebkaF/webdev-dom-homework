import { loginUser, autorizatedUser, setToken } from "./api.js";
import { getFetch } from "./main.js";
import { renderComments } from "./render.js";

let isAutorized = false;
export function userAutorisation() {
  let isLoginMode = true;
  function renderForm() {
    const loginElement = document.querySelector(".autorization");
    loginElement.innerHTML = `
<div class="password">
 <h2 class="title"> Форма ${isLoginMode ? 'входа' : 'Регистрации'}</h2>
 ${isLoginMode ? "" :
        `<input 
 type="text"
 class="login-input" id="name-input-autorization"
 placeholder="Имя"
/>`}</button>
        
        <input 
          type="text"
          class="login-input" id="login-input"
          placeholder="Логин"
        />
        <input 
          type="text"
          class="password-input" id="password-input"
          placeholder="Пароль"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id="enter-button" class="enter-button " >${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
          <button id="registration-button" class="enter-button " >Перейти ${isLoginMode ? 'к регистрации' : 'Ко входу'}</button></button>
        </div> 
`
    document.getElementById('enter-button').addEventListener('click', () => {

      if (isLoginMode) {
        const login = document.getElementById('login-input').value
        const password = document.getElementById('password-input').value


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
          password: password
        }).then((user) => {
          console.log(user);
          setToken(`Bearer ${user.user.token}`)
          getFetch();
        }).catch(error => {
          console.log(error);
          alert(error.message);
        });
      } else {

        const login = document.getElementById('login-input').value
        const password = document.getElementById('password-input').value
        const name = document.getElementById('name-input-autorization').value
        if (!login) {
          alert('Введите логин');
          return;
        }

        if (!password) {
          alert('Введите пароль');
          return;
        }
        if (!name) {
          alert('Введите имя');
          return;
        }

        autorizatedUser({
          login: login,
          password: password,
          name: name
        }).then((user) => {
          console.log(user);
          setToken(`Bearer ${user.user.token}`)
          getFetch();
        }).catch(error => {
          alert(error.message);
        });
      }
    });

    document.getElementById('registration-button').addEventListener('click', () => {
      isLoginMode = !isLoginMode;
      renderForm();
    })
  }
  renderForm()

};