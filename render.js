import { comments } from "./comments.js";
import { handleLikeClick, handleQuoteClick } from "./handlers.js";

export const renderComments = () => {
  fetch("https://wedev-api.sky.pro/api/comments", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 500) {
        throw new Error("Сервер упал");
      } else if (response.status === 400) {
        throw new Error("Ошибка в запросе");
      }
      throw new Error("Неизвестная ошибка");
    })
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
    .catch((error) => {
      console.error("Ошибка загрузки комментариев:", error);
      document.getElementById("result").textContent =
        "Не удалось загрузить комментарии";
    });
};
