import { commentList, initLikeClick, addCommentListener } from './main.js';
import { appComments } from './api.js';
import { format } from 'date-fns';

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
        //Форматирование даты
        const date = new Date();
        dates = format(date, "yyyy-MM-dd HH:mm:ss"); //YYYY-MM-DD hh:mm:ss
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