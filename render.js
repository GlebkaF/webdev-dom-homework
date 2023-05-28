import { comments } from "./api.js";

import { counterLikes, formatDate, listComments, answerComment } from "./main.js";

export const renderComments = () => {
    const commentsHTML = comments
      .map((comment, index) => {
        const formattedDate = formatDate(new Date(comment.date));
        return `<li data-index="${index}" class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
              <div>${formattedDate}</div>
            </div>
          <div class="comment-body">
            <div class="comment-text">${comment.text}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" class="like-button ${
          comment.isLiked ? '-active-like' : ''
        }"></button>
            </div>
          </div>
        </li>`;
      })
      .join('');
  
    listComments.innerHTML = commentsHTML;
    counterLikes();
    answerComment();
  };
  
 