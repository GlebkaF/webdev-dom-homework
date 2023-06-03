import { commentaries } from "./api.js";
import initLikeButtonListeners from "./like.js";

const renderComments=(listElement, getComments) => {
  const appEl = document.getElementById('app');
    const getComments = (comment,index) => {
      if(comment.isLiked) {
          return `<li  class="comment" data-index="${index}">
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
                <button data-index="${index}"  class="like-button -active-like"></button>
              </div>
            </div>
          </li>`;
      } else {
          return `<li  class="comment" data-index="${index}">
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
                <button data-index="${index}" data-likes=${comment.likes} class="like-button"></button>
              </div>
            </div>
          </li>`;

      }
  };

  const appHtml = `
  <div class="container">
    <div class="add-form">
      <h3 class="form-title">Форма входа</h3>
      <div class="form-row">
        Логин    
        <input id="login-input" type="text" class="add-form-name"/>
        <br />
        <br />
        Пароль
        <input id="login-input" type="text" class="add-form-name"/>
      </div>
      <br />
      <button id='login-button' class="add-form-button">Войти</button>
    </div>
    <div class="comments-load">
      Данные загружаются, пожалуйста подождите...
    </div>
    <ul id="list" class="comments">
      <!-- <li   class="comment">
        <div class="comment-header">
          <div>Глеб Фокин</div>
          <div>12.02.22 12:18</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            Это будет первый комментарий на этой странице
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span  class="likes-counter">3</span>
            <button data-likes="3" class="like-button"></button>
          </div>
        </div>
      </li>
      <li  class="comment">
        <div class="comment-header">
          <div>Варвара Н.</div>
          <div>13.02.22 19:22</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            Мне нравится как оформлена эта страница! ❤
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">75</span>
            <button data-likes="75" class="like-button -active-like"></button>
          </div>
        </div>
      </li> -->
      ${getComments}
    </ul>
    <div class="add-form">
      <input id="name-input"
        type="text"
        class="add-form-name"
        placeholder="Введите ваше имя"
      />
      <textarea id="comment-input"
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button id='add-button' class="add-form-button">Написать</button>
        <button class = "delete-form-button" id="delete-form-button">Удалить последний комментарий</button>
      </div>
    </div>
  </div>`
  //const commentsHtml = commentaries.map((comment, index) => getComments(comment, index)).join('');
  appEl.innerHTML = appHtml;
  const buttonElement = document.getElementById('add-button');
  const listElement = document.getElementById("list");
  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");
  const comment = document.getElementsByTagName('li');
  const deleteFormButtonElement = document.getElementById("delete-form-button");
  const commentsLoad = document.querySelector(".comments-load");

  buttonElement.addEventListener("click",() => {
    fetchPost();
    initLikeButtonListeners();
    nameInputElement.classList.remove("error");
    buttonElement.classList.remove("disabled");
    if (nameInputElement.value === "") {
        nameInputElement.classList.add("error");
        buttonElement.classList.add("disabled");
        return;
    };
    commentInputElement.classList.remove("error");
    if (commentInputElement.value === '') {
        commentInputElement.classList.add("error");
        buttonElement.classList.add("disabled");
        return;
    };
  });
  initLikeButtonListeners();
};

export default renderComments;













