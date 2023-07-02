import { users } from "./main.js";
import { listCommentElement } from "./main.js";
import { initLikeButton } from "./main.js";

// Рендерим список комментов
export const renderUsers = () => {

  const userHtml = users.map((user, index) => {
    return `<li class="comment">
        <div class="comment-header">
          <div class="comment-name">${user.name}</div>  
          <div>${user.date}</div>
        </div>

        <div class="comment-body">
          <div class="comment-text">
            ${user.text}
          </div>
        </div>

        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter" >${user.likes}</span>
            <button data-index="${index}" class='like-button ${user.colorLike}'></button>
          </div>
        </div>
      </li>`;
  }).join('');
  listCommentElement.innerHTML = userHtml;
  initLikeButton();
};
