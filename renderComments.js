import { sanitize } from "./sanitize.js";
import { initLikeButtonListener } from "./likebutton.js";
import { initReplayListener } from "./reply.js";
import { textEl } from "./main.js";

const listEl = document.getElementById("list");


export const renderComments = (comments) => {
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
  
    listEl.innerHTML = commentsHtml;
  
    initLikeButtonListener(comments);
    initReplayListener({ textEl, comments });
  };
