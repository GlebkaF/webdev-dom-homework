const listElement = document.getElementById("list");
import { initLikeButton, initEditButton, replyToComment } from "./main.js";
import { userComments } from "./main.js";

const renderUserComments = (userComments) => {
    let userCommentsHtml = userComments.map((userComment, index) => {
      if (!userComments[index].isEdit) {
        userComments.isEdit = true;
        return `<li class="comment" data-index="${index}" data-name="${userComment.name}" data-text="${userComment.comment}">
        <div class="comment-header">
          <div>${userComment.name}</div>
          <div>${userComment.date}</div>
        </div>
        <div class="comment-body">
          <div style="white-space: pre-line" class="comment-text">
            ${userComment.comment}
          </div>
        </div>
        <button data-index="${index}" class="edit-button" type="button">Редактировать</button>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${userComment.likeCounter}</span>
            <button data-index="${index}" class="like-button ${userComment.active}"></button>
          </div>
        </div>
      </li>`;
      } else {
        userComments.isEdit = false;
        return `<li class="comment">
        <div class="comment-header">
          <div>${userComment.name}</div>
          <div>${userComment.date}</div>
        </div>
        <div class="comment-body">
          <div style="white-space: pre-line" class="comment-text">
            <textarea class="comment-text-edit">${userComment.comment}</textarea>
          </div>
        </div>
        <button data-index="${index}" class="edit-button" type="button">Сохранить</button>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${userComment.likeCounter}</span>
            <button data-index="${index}" class="like-button ${userComment.active}"></button>
          </div>
        </div>
      </li>`;
      }
    }).join('');
    listElement.innerHTML = userCommentsHtml;
    initLikeButton();
    initEditButton();
    replyToComment();
  };

  export default renderUserComments;