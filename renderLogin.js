// import { fetchAndRenderTasks, postComment, fetchLogin } from "/api.js";
// import { fetchAndRerenderCommentsnderTasks } from "/renderComments.js";

export const renderLogin = (
    app,
    isLoading,
    isWaitingComment,
    comments) => {
    app.innerHTML = `
              <div class="registration">
              <div class="add-form">
                <h3>Форма ввода</h3>
                <div class="reg-input">
                  <input type="text" id="add-login" class="add-login" placeholder="Введите логин" />
                  <input type="text" id="add-password" class="add-password" placeholder="Введите пароль"></input>
                </div>
                <div class="add-reg-form">
                  <button type="button" id="in-button" class="in-button">Войти</button>
                  <button class="reg-button">Зарегистрироваться</button>
                </div>
              </div>
            </div>
    `
}
