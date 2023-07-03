import { getPromise } from "./api.js";
import { currentUser, token, renderLogin } from "./login_components.js";
import { initLike, copyComment, sendComment } from "./option.js";
import { letClearForm, letDisabledButton } from "./changeElement.js";

export function renderComments(array) {
  const elComment = document.getElementById("listComments");
  const commentsHtml = array
    .map((comment, index) => {
      let activeLike = "";
      if (array[index].isLiked) {
        activeLike = "-active-like";
      }
      return `
        <li class="comment">
            <div class="comment-header">
            <div id="commentName">${comment.name}</div>
            <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text"  id="commentText">${comment.text}</div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter" >${comment.likes}</span>
                <button class="like-button ${activeLike}" data-index='${index}'></button>
              </div>
            </div>
          </li>`;
    })
    .join("");

  elComment.innerHTML = commentsHtml;
}

export function renderApp(array) {
  const appElement = document.getElementById("app");
  if (!token) {
    renderLogin(appElement, getPromise);
    return;
  }
  const commentsHtml = array
    .map((comment, index) => {
      let activeLike = "";
      if (array[index].isLiked) {
        activeLike = "-active-like";
      }
      return `
        <li class="comment">
            <div class="comment-header">
            <div id="commentName">${comment.name}</div>
            <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text"  id="commentText">${comment.text}</div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter" >${comment.likes}</span>
                <button class="like-button ${activeLike}" data-index='${index}'></button>
              </div>
            </div>
          </li>`;
    })
    .join("");

  const appHtml = `<ul class="comments" id="listComments">
    ${commentsHtml}
    </ul>
      <p class="loading-text disnone" id="loadingList">
        Идет загрузка комминтариев, подожите...
      </p>
    <div class="add-form" id="addForm">
      <input type="text" class="add-form-name" id="user-name" value= ${currentUser} disabled/>
      <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
        id="user-text"></textarea>
      <div class="add-form-row">
        <button class="add-form-button add-form-button_disable" id="buttonComment" disabled>Написать</button>
      </div>
    </div>`;
  appElement.innerHTML = appHtml;

  const buttonElement = document.getElementById("buttonComment");
  const nameInputElement = document.getElementById("user-name");
  const textInputElement = document.getElementById("user-text");
  // отправка сообщения

  nameInputElement.addEventListener("input", () => {
    letDisabledButton(nameInputElement.value);
  });
  textInputElement.addEventListener("input", () => {
    letDisabledButton(textInputElement.value);
  });
  nameInputElement.addEventListener("click", () => {
    letClearForm(nameInputElement);
  });
  textInputElement.addEventListener("click", () => {
    letClearForm(textInputElement);
  });
  buttonElement.addEventListener("click", sendComment);
  document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      buttonElement.click();
    }
  });

  initLike(array);
  copyComment();
}
