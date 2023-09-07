import { initLikesButtonListeners, initEditButtonListeners, initEditCommentListeners } from "./main.js";

const listElement = document.getElementById("list");


export const renderComments = ({ comments, fetchAndRenderComments }) => {
    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment" data-text="${comment.text}" data-name="${comment.name}" data-index="${index}"">
      <div class="comment-header">
        <div> ${comment.name} </div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        ${comment.isEdit ? `<textarea class="edit-text" id="textarea-${index}">${comment.text}</textarea>` : `<div class="comment-text">
          ${comment.text}
        </div>`}
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.like}</span>
          <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
        </div>
      </div>
      <div class="add-form-row">
      <button class="add-form-button edit-comment" data-index="${index}">${comment.isEdit ? 'Сохранить' : 'Редактировать'} </button>
    </div>
    </li>`
    }).join(' ');

    listElement.innerHTML = commentsHtml;

    initLikesButtonListeners();
    initEditButtonListeners();
    initEditCommentListeners();
}