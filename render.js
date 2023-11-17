import {listElement, comments} from './constants.js'
import { unauthorizedId } from './constants.js'; 
export const renderComments = () => {
    const commentsHtml = comments.map((comment, index)=> {
      return `<li class="comment" id=${index}>
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.comment}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            ${comment.likes}
            <button onclick="event.stopPropagation()" class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}" id="${index}"></button>
          </div>
        </div>
      </li>`;
    }).join('');
    listElement.innerHTML = commentsHtml;
  }