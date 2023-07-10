
import { addLikeButton, replyComment } from "./modules/helper.js";

  const listElement = document.getElementById('list'); 
  // const addingAComment = document.getElementById('adding');

  

export const renderCommentList = (commentList) => {
    const commentHtml = commentList.map((comment, index) => {
    return `<li class="comment data-comment-content="${index}">
              <div class="comment-header">
                <div>${comment.name}</div>
                <div>${comment.date}</div>
              </div>
              <div class="comment-body">
                <div class="comment-text">
                  ${comment.text}
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${comment.likes}</span>
                  <button class="like-button ${comment.activeClass}" data-button-like="${index}"></button>
                </div>
              </div>
            </li>`
      }).join('');
      listElement.innerHTML = commentHtml;
      addLikeButton(commentList);
      replyComment();
    };

    export const renderAddingList = () => {
      const authHtml = `
      <div class="auth-form" id="auth">
      <div id="form-registration">
      <h1>Форма регистрации</h1>
      <input
        type="text"
        class="add-form-text"
        id="registrationName"
        placeholder="Вверите ваше имя"
      />
      </div>
      <div id="form-entrance">
      <h1>Форма входа</h1></div>
      <input
        type="text"
        class="add-form-text"
        id="login"
        placeholder="Вверите ваш логин"
      />
      <input
      type="password"
      class="add-form-text"
      id="password"
      placeholder="Вверите ваш пароль"
      />
        <button class="auth-form-button" id="button-button">Войти</button>
        <button class="auth-form-button" id="button">Зарегистрироваться</button>
        <button class="registration-form-button" id="registration-button" href="shape">Зарегистрироваться</button>
        <button class="registration-form-button" id="exit-button" href="shape">Войти</button> 
      </div> `;
        listElement.innerHTML = authHtml;
        };

        export const renderName = () => {
            document.getElementById('name').value = "Пользователь";
        }

        



