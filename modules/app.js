import { init as initAddForm } from "./addForm.js";
import { init as initComments } from "./comments.js";
import { init as initDeleteComment } from "./deleteLastComments.js";
import { loadComments } from "./comments.js";
import { getUser, logout } from "./userStore.js";
import { loginForm } from "./loginForm.js";

export const render = () => {
  const user = getUser();
  const container = document.querySelector('.container');
  container.innerHTML = `
                        <div class="waiter">Пожалуйста подождите, загружаю комментарии...</div>
                        <ul class="comments"></ul>
                        <div class="bottomForm">${getBottomForm(user)}</div>
                        <button class="logout">EXIT</button>`;

  initComments();
  loadComments();
  exit();
  if (user) {
    initAddForm();
    initDeleteComment();
  } else {
    login();
  }
}

const login = () => {
  const authButton = document.querySelector('.auth');
  authButton.addEventListener('click', loginForm);
}

const exit = () => {
  const btn = document.querySelector('.logout');
  btn.addEventListener('click', () => {
    logout();
    render();
  });
}

const getBottomForm = (user) => {
  if (!user) {
    return `<div class="auth-waiter">Чтобы добавить комментарий, <span class="auth">авторизуйтесь</span></div>`
  }

  return `<div class="add-form">
          <input type="text" class="add-form-name" value="${user.name}" disabled/>
          <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
          <div class="add-form-row">
            <button class="add-form-button">Написать</button>
          </div>
        </div>
        <div class="wait"></div>
        <button class="remove-form-button">Удалить последний комментарий</button>`;
}


