import { comments } from "../main.js";
import { actionCommentListener, addLike, editingComment, initEditElements, initSaveButtons } from "./eventListeners.js";
import { sanitizeHtml } from "./templates.js";

export const renderComments = () => {
    const formCommentElement = document.getElementById('add-comment');
    formCommentElement.innerHTML = comments.map((comment, index) => {
        return `<li class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${sanitizeHtml(comment.name)}</div>
        <div class="comment-date">${sanitizeHtml(comment.date)}</div>
      </div>
      <div class="comment-body">
        ${comment.isEdit
                ? `<textarea type="textarea"  class="add-form-text" placeholder="Введите ваш коментарий" rows="4">${sanitizeHtml(comment.text)}</textarea>`
                : `<div class="comment-text" data-index="${index}"> ${sanitizeHtml(comment.text)} </div>`}
      </div>
      <div class="comment-footer">
        ${comment.isEdit
                ? `<button  class="save-form-button" data-index="${index}">Сохранить</button>`
                : `<button  class="edit-form-button" data-index="${index}">Редактировать</button>`
            }
        <div class="likes">
          <span class="likes-counter">${comment.likeCount}</span>
          <button class="like-button ${comment.isLike ? '-active-like' : ''}" data-index="${index}"></button>
        </div>
      </div>
    </li>`
    }).join('');
    addLike();
    initEditElements();
    initSaveButtons();
    editingComment();
    actionCommentListener();
};