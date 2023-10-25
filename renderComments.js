import { addLikes } from "./addLikes.js";
import { addQuote } from "./addQuote.js";

const commentsElements = document.querySelectorAll(".comments");
const commentListElement = document.getElementById("comment-list");

export const renderComments = ({ comments }) => {
    const commentsHtml = comments.map((comment, index) => {
      let liked = comment.isLike ? `-active-like` : ``;
      return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${comment.isLike ? `-active-like` : ``} ${comment.isLikeLoading ? `-loading-like` : ``}" data-index="${index}"></button>
          </div>
        </div>
      </li>`;
    })
    .join("");
  
    commentListElement.innerHTML = commentsHtml;
  
    addLikes({ comments });
    addQuote({ comments });
  };