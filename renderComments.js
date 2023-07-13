//const listElement = document.getElementById("list");
import { initLikeButton, initEditButton, replyToComment } from "./main.js";


const renderUserComments = (userComments) => {

  const appEl = document.getElementById("app");

  let userCommentsHtml = userComments.map((userComment, index) => {
    if (!userComments[index].isEdit) {
      userComments.isEdit = true;
      return `<li class="comment" data-index="${index}" data-name="${userComment.name}" data-text="${userComment.comment}">
      <div class="comment-header">
        <div>${userComment.name}</div>
        <div>${userComment.date}</div>
      </div>
      <div class="comment-body">
        <div style="white-space: pre-line" class="comment-text">
          ${userComment.comment}
        </div>
      </div>
      <button data-index="${index}" class="edit-button" type="button">Редактировать</button>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${userComment.likeCounter}</span>
          <button data-index="${index}" class="like-button ${userComment.active}"></button>
        </div>
      </div>
    </li>`;
    } else {
      userComments.isEdit = false;
      return `<li class="comment">
      <div class="comment-header">
        <div>${userComment.name}</div>
        <div>${userComment.date}</div>
      </div>
      <div class="comment-body">
        <div style="white-space: pre-line" class="comment-text">
          <textarea class="comment-text-edit">${userComment.comment}</textarea>
        </div>
      </div>
      <button data-index="${index}" class="edit-button" type="button">Сохранить</button>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${userComment.likeCounter}</span>
          <button data-index="${index}" class="like-button ${userComment.active}"></button>
        </div>
      </div>
    </li>`;
    }
  }).join('');

const appHtml = `

<div class="container">
<p id="comments-loader">Пожалуйста, подождите, загружаю комментарии...</p>
<ul id="list" class="comments">
  <!-- The list is rendering from JS --> 
${userCommentsHtml}
</ul>
<p id="new-comment-loader" class="hidden">Комментарий добавляется...</p>

<div id="new-comment-section" class="add-form">
  <h3 class="login-form-title">Форма входа</h3>
  <div class="login-form">
    <p class="login-form-text">Логин</p> 
    <input id="login-input" value=""
      type="text"
      class="add-form-name"
      />
      <br> <br>
      <p class="login-form-text">Пароль</p>
    <input id="password-input" value=""
      type="text"
      class="add-form-name"
      />
  </div>
  
  <div class="login-form">
    <button id="add-button" class="login-button">Войти</button>
  </div>
</div>


<div id="new-comment-section" class="add-form">
  <input id="name-input" value=""
    type="text"
    class="add-form-name"
    placeholder="Введите ваше имя"
  />
  <textarea id="comment-input" value=""
    type="textarea"
    class="add-form-text"
    placeholder="Введите ваш комментарий"
    rows="4"
  ></textarea>
  <div class="add-form-row">
    <button disabled="true" id="add-button" class="add-form-button">Написать</button>
    <button id="delete-button" class="add-form-button">Удалить последний</button>
  </div>
</div>
</div>`;


    appEl.innerHTML = appHtml;

    initLikeButton(userComments);
    initEditButton(userComments);
    replyToComment(userComments);
  };

  export default renderUserComments;