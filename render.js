import { commentsArray } from "./main.js";

export function renderComments(){  const commentsHtml = commentsArray
.map((item, index) => {
  return `
      <li class="comment" data-user-name="${item.name}" data-text="${item.comment}">
      <div class="comment-header">
        <div>${item.name}</div>
        <div>${item.date}</div>
      </div>
      <div class="comment-body">
            <div class = "comment-text">${item.comment}</div>
      </div>
      <div class="comment-footer">
        <button data-index="${index}" class="remove-button">Удалить</button>
        <div class="likes">
          <span class="likes-counter">${item.like}</span>
          <button data-index='${index}' class="like-button ${item.paint}"</button>
        </div>
      </div>
    </li>`;})
}
