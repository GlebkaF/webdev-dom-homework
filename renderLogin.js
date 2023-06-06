export const renderLogin = (app, onLoginSubmit, loginError) => {
  app.innerHTML = `
  <div class="comment-form">
    <div class="container">
      <div class="add-form">
        ${loginError ? `<span>${loginError}</span>` : ''}
        <h3 class="title">Форма входа</h3>
        <input
          id="login"
          type="text"
          class="add-form-name add-form-login"
          placeholder="Введите логин"
        />
        </br>
        <input
        id="password"
        type="password"
        class="add-form-name"
        placeholder="Введите пароль"
        />

        <button id="auth-button" disabled class="auth-button add-form-button">
          Войти
        </button>

        <button id="auth-toggle-button" class="auth-button add-form-button auth-toggle">
          Зарегистрироваться
        </button>
      </div>
    </div>  
  </div>
  `;

  const authButton = document.getElementById("auth-button");
  const inputElements = document.querySelectorAll(".add-form-name");

  authButton.addEventListener("click", () => {
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    onLoginSubmit(login, password);
  });

  for (const inputElement of inputElements) {
    inputElement.addEventListener("input", () => {
      const login = document.getElementById("login").value;
      const password = document.getElementById("password").value;

      if (login && password) {
        authButton.removeAttribute("disabled");
      } else {
        authButton.setAttribute("disabled", true);
      }
    })
  }
};