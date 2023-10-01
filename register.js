import { register } from "./API";



const buttonElement = document.getElementById("add-comment-button");
const loginInputElement = document.getElementById("login-input");
const passwordInputElement = document.getElementById("password-input");

buttonElement.addEventListener("click", () => {
  const loginValue = loginInputElement.value;
  const passwordValue = passwordInputElement.value;

  if (!loginValue || !passwordValue) {
    alert("Введите логин и пароль");
    return;
  }

  register({ login: loginValue, password: passwordValue })
    .then((responseData) => {
      if (responseData.user && responseData.user.token) {
        setToken(responseData.user.token);
        window.location.href = "indexPass.html";
      } else {
        alert("Ошибка входа. Проверьте правильность введенных данных.");
      }
    })
    .catch((error) => {
      alert(`Ошибка входа: ${error.message}`);
    });
});
