import { comments } from "./index.js";
import { listElement } from "./index.js";
import { changeLikesListener } from "./index.js";
import { editComment } from "./index.js";

//рендер-функция

const renderComments = () => {
    const commentsHtml = comments
        .map((comment, index) => {
            return `
          <li data-text = '&gt ${comment.text} \n ${comment.name
                }' class="comment">
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
                <span class="likes-counter">${comment.counter}</span>
                <button data-index = '${index}' class="${comment.liked ? "like-button -active-like" : "like-button"
                }"></button>
              </div>
            </div>
          </li>`;
        })
        .join("");
    listElement.innerHTML = commentsHtml;

    // deleteComments();
    changeLikesListener();
    editComment();
};

export default renderComments;