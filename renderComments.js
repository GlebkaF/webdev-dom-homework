import { sanitize } from "./sanitize.js";
import { initLikeButtonListener } from "./likebutton.js";
import { initReplayListener } from "./reply.js";
import { renderLogin } from "./renderLogin.js";
import { fetchGetAndRenderComments } from "./main.js";
import { setLoading } from "./api.js";

export const textEl = document.getElementById("add-form-text");

export function renderComments(comments) {
  const appElement = document.getElementById("app");
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

  // const appHTML = `
  // <ul id="list" class="comments">
  //   ${commentsHtml}
  // </ul>
  // <div id="login-text" class="loader">Чтобы добавить комментарий, <span class="login-link"  id="login-link">авторизуйтесь</span></div>
  
  
  // </div>`;

  appElement.innerHTML = commentsHtml;

  setLoading(false);

  const loginLinkEl = document.getElementById("login-link");

  loginLinkEl.addEventListener("click", () => {
    renderLogin({ fetchGetAndRenderComments });
  });

  initLikeButtonListener(comments);
  const textEl = document.getElementById("add-form-text");
  initReplayListener({ textEl, comments });
}
