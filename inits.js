import { objOfConst } from "./constant.js";
import { renderComments } from "./render.js";

// Обработчик клика лайка

export function initLikeListeners() {

    const likeButtons = document.querySelectorAll(".like-button");

    for (const likeButton of likeButtons) {
        likeButton.addEventListener("click", (event) => {
        event.stopPropagation();

        const index = likeButton.dataset.index;
        objOfConst.comments[index].likes += objOfConst.comments[index].isLiked ? -1 : +1;
        objOfConst.comments[index].isLiked = !objOfConst.comments[index].isLiked;

        renderComments();
        });
    }
}

// Обработчик клика для ответа на комментарий

export function initReplyListeners() {
    const commentElements = document.querySelectorAll(".comment");
  
    for (const commentElement of commentElements) {
      commentElement.addEventListener("click", () => {
        const index = commentElement.dataset.comment;
  
        objOfConst.commentInputElement.value =
          `> ${objOfConst.comments[index].text} (${objOfConst.comments[index].name})`;
      });
    }
  };