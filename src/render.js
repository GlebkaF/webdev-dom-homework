import {
  likeButtonsListener,
  commentsListener,
  quoteListener,
  editButtonsListener,
  saveCommentButtonsListener,
  buttonDisable,
  deleteLastButtonFunc,
  keyEnter,
} from "./listeners.js";
import { addComment } from "./utilities.js";
import { commentsArr } from "./globalVariables.js";

let formName = document.querySelector(".add-form-name");
let formText = document.querySelector(".add-form-text");
let comments = document.querySelector(".comments");
let formButton = document.querySelector(".add-form-button");
let deleteLastBotton = document.querySelector(".delete-last__form-button");

const renderComments = () => {
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
            <button class="edit-button ${
              el.editComment ? "display_none" : ""
            }" data-comment_text="${
              el.comment
            }"  data-indx=${indx}>Редактировать</button>
            <button class="save-comment-button ${
              !el.editComment ? "display_none" : ""
            }" data-indx=${indx} data-quote="${el.comment.slice(
              el.comment.indexOf("QUOTE_BEGIN"),
              el.comment.lastIndexOf("QUOTE_END") > -1
                ? el.comment.lastIndexOf("QUOTE_END") + 9
                : -1
            )}">Сохранить</button>
            <div class="likes">
              <span class="likes-counter">${el.countLikes}</span>
              <button class="like-button ${
                el.likeSet ? "-active-like" : ""
              }" data-indx=${indx}></button>
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

  deleteLastBotton.addEventListener("click", deleteLastButtonFunc);

  likeButtonsListener();
  editButtonsListener();
  saveCommentButtonsListener();
  commentsListener();
  quoteListener();
  buttonDisable();
};

export { renderComments };
