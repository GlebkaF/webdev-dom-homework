import { login, regNewUser, setToken, token } from "./api.js";

// renderLogin.js

const attachRegisterEventListener = () => {
  const newUserName = document.getElementById("register-name");
  const newUserLogin = document.getElementById("register-login");
  const newUserPassword = document.getElementById("register-password");
  const registerNewUser = document.getElementById("register-new-user");

  registerNewUser.addEventListener('click', () => {
    regNewUser({
      login: newUserLogin.value,
      name: newUserName.value,
      password: newUserPassword.value,
    }).then((responseData) => {

      console.log(token);
      setToken(responseData.user.token);
      console.log(token);
    });

    const showCommentsInput = document.querySelector('.add-form');
    const hideRegistrationForm = document.querySelector(".register-form");
    showCommentsInput.style.display = 'flex';
    hideRegistrationForm.style.display = 'none';


    // Set the value of .add-form-name to the user's name
    const userNameInput = document.querySelector(".add-form-name");
    if (userNameInput) {
      userNameInput.value = newUserName.value;
      userNameInput.readOnly = true;
    }
  });
};



const appElement = document.getElementById("app");
const registrationElement = document.getElementById("registration");

const attachLoginEventListener = () => {
  const loginButtonElement = document.getElementById("submit-account");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");

  loginButtonElement.addEventListener('click', () => {
    login({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    }).then((responseData) => {

      console.log(token);
      setToken(responseData.user.token);
      console.log(token);
    });
    const showCommentsInput = document.querySelector('.add-form');
    const hideLoginForm = document.querySelector(".login-form");
    showCommentsInput.style.display = 'flex';
    hideLoginForm.style.display = 'none';


    // Set the value of .add-form-name to the user's name
    const userNameInput = document.querySelector(".add-form-name");
    if (userNameInput) {
      userNameInput.value = loginInputElement.value;
      userNameInput.readOnly = true;
    }
  });
};

export const renderLogin = () => {
  const loginHtml = `
    <div class="login-form" style="display: flex;"> Форма входа
        <input type="text" class="enter-login" id="login-input" placeholder="Логин" />
        <input type="text" class="enter-password" id="password-input" placeholder="Пароль" />
        <div class="submit-button">
            <button  class="submit-account" id="submit-account">Войти</button>
        </div>      
        <a class="register">Зарегистрироваться</a>
    </div>
  `;

  appElement.innerHTML = loginHtml;
  registrationElement.innerHTML = ''; // Clear registration form  

  // Call the function to attach the event listener
  attachLoginEventListener();
};


// renderLogin.js


export const renderRegistration = () => {
  const registrationFormHtml = `
        <div class="register-form" style="display: flex;"> Форма регистрации
            <input type="text" class="register-name" id="register-name" placeholder="Введите имя" />
            <input type="text" class="register-login" id="register-login" placeholder="Введите логин" />
            <input type="text" class="register-password" id="register-password" placeholder="Введите пароль" />
            <div class="submit-button">
                <button class="submit-login_password" id="register-new-user">Зарегистрироваться</button>
            </div>
            <a class="enter">Войти</a>
        </div>
    `;

  appElement.innerHTML = ''; // Clear login form
  registrationElement.innerHTML = registrationFormHtml;

  attachRegisterEventListener();
}

