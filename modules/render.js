import { errorMoment } from "./utils.js";
import { formatDate } from "./utils.js";
import { comments } from "./data.js";

const commentsContainer = document.querySelector(".comments");

export const commentsRender = () => {
  const commentElement = comments
    .map((comment, index) => {
      return `<li data-index="${index}" class="comment">
        <div class="comment-header">
          <div class="comment-name">${errorMoment(comment.author.name)}</div>
          <div class="commnet-date">${formatDate(comment.date)}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${errorMoment(comment.text)}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button id='comment-like--btn' data-index='${index}' class='${comment.isLiked ? "like-button -active-like" : "like-button"}'></button>
          </div>
        </div>
      </li>`;
    })
    .join("");

  commentsContainer.innerHTML = commentElement;
};


