import {listElement, comments} from './constants.js'
import { answerComment } from "./answers.js";

function getLike(index) {
  if (!comments[index].isLiked) {
    comments[index].likes++
  } else {
    comments[index].likes--
  }
  comments[index].isLiked = !comments[index].isLiked;
  renderComments();
}

export const renderComments = () => {
    const commentsHtml = comments.map((comment, index)=> {
      return `<li class="comment" onclick=answerComment(${index})>
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
            <button onclick="getLike(${index}).event.stopPropagation()" class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}" id="like-buttlike-button-${index}"></button>
          </div>
        </div>
      </li>`;
    }).join('');
    listElement.innerHTML = commentsHtml;
  }