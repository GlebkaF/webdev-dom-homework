export function renderLoginComponent (element) {
    const loginHTML = `
    <div class="login-form hide" id="loginForm">
    <h2 class="hide">Форма регистрации</h2>
    <h2>Форма входа</h2>
    <input type="text" class="login-form-input hide" placeholder="Введите ваше имя" id="login-name-input" />
    <input type="text" class="login-form-input" placeholder="Введите логин" id="login-input" />
    <input type="password" class="login-form-input" placeholder="Введите пароль" id="password-input" />
    <div class="login-form-row">
      <a href="#" class="link hide">Перейти к регистрации</a>
      <a href="#" class="link ">Вернуться к авторизации</a>
      <button id="registrationButton" class="registration-button ">Зарегистрироваться</button>
      <button id="loginButton" class="login-button hide">Войти</button>
    </div>
  </div>`
element.innerHTML = loginHTML;





}