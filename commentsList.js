import { getTime } from './timeConverter.js';

export const getCommentsList = (comment, index) => {
    return `<li data-index=${index} class="comment">
    <div class="comment-header">
      <div>${comment.author.name}</div>
      <div>${getTime(comment.date)}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${comment.text}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${comment.likes}</span>
        <button data-index="${index}" class="like-button ${comment.isLiked ? '-active-like' : 'like-button'}"></button>
      </div>
    </div>
  </li>`;
  };


