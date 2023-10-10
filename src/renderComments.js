import {
  likeButtonsListener,
  commentsListener,
  quoteListener,
  editButtonsListener,
  saveCommentButtonsListener,
  buttonDisable,
  keyEnter,
  deleteButtonsListener,
} from "./listeners.js";
import { addComment } from "./utilities.js";
import { commentsArr } from "./globalVariables.js";
import { renderLogin } from "./renderLogin.js";

const renderComments = () => {
  let conteinerHtml = document.querySelector(".container");

  conteinerHtml.innerHTML = `<ul class="comments">
  </ul>
  <div class="add-form display_none">
    <input type="text" class="add-form-name" placeholder="Введите ваше имя" />
    <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
    <div class="add-form-row">
      <button class="add-form-button">Написать</button>
    </div>
  </div>
  <div class="authorization">
    <p class="authorization__text">Чтобы добавить комментарий,<button class="authorization__button"
        href="">авторизуйтесь</button></p>
  </div>
  <div class="loading display_none">
    <p class="loading__text">Комментарий добавляется...</p>
  </div>`;

  let formName = document.querySelector(".add-form-name");
  let formText = document.querySelector(".add-form-text");
  let comments = document.querySelector(".comments");
  let formButton = document.querySelector(".add-form-button");
  let authorizationButton = document.querySelector(".authorization__button");
  let addForm = document.querySelector(".add-form");
  let authorizationForm = document.querySelector(".authorization");

  comments.innerHTML = "";
  comments.innerHTML =
    comments.innerHTML +
    commentsArr
      .map(
        (el, indx) => `<li class="comment">
          <div class="comment-header">
            <div>${el.name}</div>
            <div>${el.created}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text ${
              el.editComment ? "display_none" : ""
            }" data-text="${el.comment}" data-name="${el.name}">
              ${el.comment
                .replaceAll("QUOTE_BEGIN", '<div class="quote">')
                .replaceAll("QUOTE_END", "</div>")}
            </div>
            <textarea class="edit-comment ${
              !el.editComment ? "display_none" : ""
            }" type="textarea" rows="1">${el.comment.replace(
              el.comment.slice(
                el.comment.indexOf("QUOTE_BEGIN"),
                el.comment.lastIndexOf("QUOTE_END") > -1
                  ? el.comment.lastIndexOf("QUOTE_END") + 9
                  : -1
              ),
              ""
            )}</textarea>
          </div>
          <div class="comment-footer">
            <div class="comment-buttons">
            <button class="edit-button ${
              el.editComment ? "display_none" : ""
            }" data-comment_text="${
              el.comment
            }"  data-indx=${indx}>Редактировать</button>
            <button class="delete-button ${
              el.editComment ? "display_none" : ""
            }" data-comment_text="${el.comment}"  data-indx=${
              el.id
            }>Удалить</button>
            <button class="save-comment-button ${
              !el.editComment ? "display_none" : ""
            }" data-indx=${el.id} data-quote="${el.comment.slice(
              el.comment.indexOf("QUOTE_BEGIN"),
              el.comment.lastIndexOf("QUOTE_END") > -1
                ? el.comment.lastIndexOf("QUOTE_END") + 9
                : -1
            )}">Сохранить</button>
            </div>
            <div class="likes">
              <span class="likes-counter">${el.countLikes}</span>
              <button class="like-button ${
                el.likeSet ? "-active-like" : ""
              }" data-indx=${el.id}></button>
            </div>
          </div>
        </li >`
      )
      .join("");

  formName.addEventListener("input", buttonDisable);
  formText.addEventListener("input", buttonDisable);

  formButton.addEventListener("click", addComment);

  formName.addEventListener("keyup", keyEnter);
  formText.addEventListener("keyup", keyEnter);

  authorizationButton.addEventListener("click", renderLogin);

  if (window.localStorage.getItem("Token")) {
    addForm.classList.remove("display_none");
    authorizationForm.classList.add("display_none");
    formName.value = window.localStorage.getItem("userName");
    formName.disabled = true;

    likeButtonsListener();
    saveCommentButtonsListener();
    commentsListener();
    quoteListener();
    buttonDisable();
  }

  editButtonsListener();
  deleteButtonsListener();
};

export { renderComments };
