import { comments } from "./comments.js";
import { handleLikeClick, handleQuoteClick } from "./handlers.js";

export const renderComments = () => {
  fetch("/api/comments")
    .then((response) => response.json())
    .then((comments) => {
      const commentsEl = document.querySelector(".comments");
      commentsEl.innerHTML = "";

      comments.forEach((comment, index) => {
        const commentElement = document.createElement("li");
        commentElement.className = "comment";

        commentElement.innerHTML = `
            <div class="comment-header">
                <div>${comment.name}</div>
                <div>${comment.date}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">${comment.comment}</div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likesCount}</span>
                    <button class="like-button ${comment.isLiked ? "-active-like" : ""}" 
                            data-comment-index="${index}"></button>
                </div>
            </div>
        `;

        commentElement
          .querySelector(".like-button")
          .addEventListener("click", handleLikeClick);
        commentElement.addEventListener("click", handleQuoteClick);
        commentsEl.appendChild(commentElement);
      });
    })
    .catch((error) => console.log("Ошибка загрузки комментария:", error));
};
