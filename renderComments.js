import { sanitize } from "./sanitize.js";
import { initLikeButtonListener } from "./likebutton.js";
import { initReplayListener } from "./reply.js";
// import { nameEl, textEl, formEl } from "./main.js";
import { userInput1, userInput2 } from "./userinput.js";

const listEl = document.getElementById("list");
export const comLoader = document.getElementById("com-loader");
export const nameEl = document.getElementById("add-form-name");
export const textEl = document.getElementById("add-form-text");
export const buttonEl = document.getElementById("add-form-button");
export const formEl = document.getElementById("add-form");
export const formLoader = document.getElementById("form-loader");
export const loginLinkEl = document.getElementById("login-link");

export function renderComments(comments) {
  const appElement = document.getElementById("appp");
  const commentsHtml = comments
    .map((comment, index) => {
      let editComment = () => {
        if (comment.isEdit) {
          return `<textarea data-index="${index}" id="add-form-edit-text" type="textarea" class="add-form-edit-text" placeholder=""
  rows="4" > ${sanitize(comment.text)}</textarea>`;
        } else {
          return `${sanitize(comment.text)} `;
        }
      };
      return `<li class="comment">
        <div class="comment-header">
          <div>${sanitize(comment.name)}</div>
          <div id="add-form-date">${comment.date}</div>
        </div>
        <div class="comment-body">
          <div data-index="${index}" class="comment-text" style="white-space:pre-line">
            <a class="replay-form-link" ${
              comment.isEdit ? "" : 'href="#add-form"'
            }> ${editComment()}</a>
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span data-index="${index}" class="likes-counter">${
        comment.like_count
      }</span>
            <button data-index="${index}" class="like-button ${
        comment.like_active ? "-active-like" : ""
      }"></button>
          </div>
        </div >
      </li>`;
    })
    .join("");

    const appHTML = `<div class="loader" id="com-loader" hidden>
    Пожалуйста подождите, комментарии загружаются...
  </div>
  <ul id="list" class="comments">
    ${commentsHtml}
  </ul>
  <div id="login-text" class="loader">Чтобы добавить комментарий, <span id="login-link">авторизуйтесь</span></div>
  <div class="loader" id="form-loader" hidden>
    Комментарий добавляется...
  </div>
  <div id="add-form" class="add-form">
    <input id="add-form-name" readonly type="text" class="add-form-name" value="${nameEl}" />
    <textarea id="add-form-text" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
      rows="4"></textarea>
    <div class="add-form-row">
      <button id="add-form-button" class="add-form-button">Написать</button>
    </div>
  </div>`

  //listEl.innerHTML = commentsHtml;
  appElement.innerHTML = appHTML;
  
  formEl.classList.add("add-form_displayNone");
  buttonEl.disabled = true;

  

  userInput1({ nameEl, textEl, formEl, buttonEl });

  buttonEl.addEventListener("click", () => {
    userInput2({ nameEl, textEl });
  
    const fetchPostAndRenderComments = () => {
      fetchPost({ text: textEl.value, name: nameEl.value })
        .then(() => {
          return fetchGetAndRenderComments();
        })
        .then(() => {
          buttonEl.disabled = true;
          nameEl.value = "";
          textEl.value = "";
          formEl.classList.remove("add-form_displayNone");
          formLoader.hidden = true;
        })
        .catch((error) => {
          formEl.classList.remove("add-form_displayNone");
          formLoader.hidden = true;
  
          if (error.message === "Неправильный запрос") {
            alert("Длина имени и комментария должна быть более 3 символов");
            console.warn(error);
            return;
          }
          if (error.message === "Сервер сломался") {
            console.warn(error);
            console.log("Повторная отправка");
            fetchPostAndRenderComments();
            return;
          }
          if (error.message === "Failed to fetch") {
            console.warn(error);
            alert(
              "Сбой подключения! Пожалуйста, проверьте подключение и повторите отправку."
            );
            comLoader.textContent =
              "Комментарии не загружены. Пожалуйста, проверьте подключение и повторите отправку.";
            return;
          }
        });
    };
    fetchPostAndRenderComments();
    renderComments(comments);
  });

  
  initLikeButtonListener(comments);
  initReplayListener({ textEl, comments });
}
