import { registerUser, loginUser } from "./api.js";

const appEl = document.querySelector(".container");
export function renderLogin({appEl, renderTasks, comments, setToken }) {
  let isLogin = true;
  const renderForm = () => {
      const listComment = comments.map((user, index) => {
        return `<li data-index="${index}" class="comment">
        <div class="comment-header">
          <div>${user.author.name}</div>
          <div>${new Date(user.date).toLocaleString()}</div>
        </div>
        <div data-index="${index}" class="comment-body">
          <div class="comment-text">
            ${user.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${user.likes}</span>
            <button data-index="${index}"class="like-button ${user.likeComment ? '-active-like' : ''}"></button>
          </div>
        </div>
      </li>`;
      }
      ).join("");
    
      const appAddForm =
      `<div class="container">
      <ul class="comments">
      ${listComment}
      <div class="form-autoriz">Чтобы добавить комментарий, <button class ="autoriz">авторизуйтесь</button></div>
      </ul>

<div class="form-login">
<h1 class = "form-enter">Форма ${isLogin ? 'входа' : 'регистрации'}</h1>
${isLogin ? '' : `<input
type="text"
class="add-form-name"
placeholder="Введите имя"
/>`}
  <input
    type="text"
    class="add-form-login"
    placeholder="Введите логин"
  />
  <input
    type="password"
    class="add-form-password"
    placeholder="Введите пароль"
  />
  <div class="add-form-row">
    <button class="form-button-enter">${isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
  </div>
  <div class="add-form-row">
  <button class="toggle-button-enter">Перейти ${isLogin ? 'к регистрации' : 'ко входу'}</button>
</div>
</div>
</div>`;
appEl.innerHTML = appAddForm;

document.querySelector('.form-login').style.display = 'none';
document.querySelector('.comments').style.display = 'flex';
document.querySelector(".autoriz").addEventListener("click", () => {
renderForm();
document.querySelector('.form-login').style.display = 'flex';
document.querySelector('.comments').style.display = 'none';
});

document.querySelector(".form-button-enter").addEventListener("click", () => {
  if(isLogin){
  const login = document.querySelector(".add-form-login");
  const password = document.querySelector(".add-form-password");
  if (!login) {
    alert("Введите логин");
    return;
  }
  if (!password) {
    alert("Введите пароль");
    return;
  }
  loginUser({
    login: login.value,
    password: password.value,
  }).then((user) => {
    setToken (`Bearer ${user.user.token}`);
      renderTasks();
      document.querySelector('.form-autoriz').style.display = 'none';
  }).catch((error) => {
    alert(error.message);
  });
} else {
  const login = document.querySelector(".add-form-login");
  const password = document.querySelector(".add-form-password");
  const name = document.querySelector(".add-form-name");
  if (!name) {
    alert("Введите имя");
    return;
  }
  if (!login) {
    alert("Введите логин");
    return;
  }
  if (!password) {
    alert("Введите пароль");
    return;
  }
  registerUser({
    login: login.value,
    password: password.value,
    name: name.value,
  }).then((user) => {
    setToken (`Bearer ${user.user.token}`);
    renderTasks()
  }).catch((error) => {
    console.log(error);
    alert(error.message);
  });
};
});

document.querySelector(".toggle-button-enter").addEventListener('click', () => {
  isLogin = !isLogin;
  renderForm();
  });
}
renderForm();
}