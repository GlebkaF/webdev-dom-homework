import { sanitize } from "./sanitize.js";
import { initLikeButtonListener } from "./likebutton.js";
import { initReplayListener } from "./reply.js";
//import { textEl} from "./renderForm.js";

import { renderLogin, setLogin } from "./renderLogin.js";
import { fetchGetAndRenderComments } from "./main.js"
import { isLoading, setLoading } from "./api.js";


//const listEl = document.getElementById("list");

// export const nameEl = document.getElementById("add-form-name");
export const textEl = document.getElementById("add-form-text");
// export const buttonEl = document.getElementById("add-form-button");
// export const formEl = document.getElementById("add-form");
export const formLoader = document.getElementById("form-loader");




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
            <a class="replay-form-link" ${comment.isEdit ? "" : 'href="#add-form"'
        }> ${editComment()}</a>
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span data-index="${index}" class="likes-counter">${comment.like_count
        }</span>
            <button data-index="${index}" class="like-button ${comment.like_active ? "-active-like" : ""
        }"></button>
          </div>
        </div >
      </li>`;
    })
    .join("");

  const appHTML = `
  <ul id="list" class="comments">
    ${commentsHtml}
  </ul>
  <div id="login-text" class="loader">Чтобы добавить комментарий, <span class="login-link"  id="login-link">авторизуйтесь</span></div>
  <div class="loader" id="form-loader" hidden>
    Комментарий добавляется...
  </div>
  
  </div>`

  appElement.innerHTML = appHTML;
  
  setLoading(false);

  const loginLinkEl = document.getElementById("login-link");

  loginLinkEl.addEventListener("click", () => {
    renderLogin({ fetchGetAndRenderComments });
  })
  
  
  initLikeButtonListener(comments);
  initReplayListener({ textEl, comments });
}
