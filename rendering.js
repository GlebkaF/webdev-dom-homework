import { commentList, initLikeClick, addCommentListener } from './main.js';
import { appComments } from './api.js';

export function renderComments() {
  const commentHtmlResult = appComments
    .map((comment, id) => {
      let Iliked = '';
      let dates = '';

      if (comment.Iliked) {
        Iliked = '-active-like';
      }

      if (comment.date) {
        dates = comment.date;
      } else {
        const date = new Date();
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear().toString().slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        dates = `${day}.${month}.${year} ${hours}:${minutes}`;
      }

      return `<li class="comment" data-id="${id}">
        <div class="comment-header">
          <div class="comment-name">${comment.name}</div>
          <div>${dates}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${comment.text}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.like}</span>
            <button class="like-button ${Iliked}" data-id="${id}"></button>
          </div>
        </div>
      </li>`;
    })
    .join('');

  commentList.innerHTML = commentHtmlResult;
  initLikeClick();
  addCommentListener();
}