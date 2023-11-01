import { renderComments } from "./renderComments.js";

function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
  }

export const addLikes = ({ comments }) => {
    const likeButtons = document.querySelectorAll(".like-button");
    for (const likeButton of likeButtons) {
      likeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        
        const index = likeButton.dataset.index;
        comments[index].isLikeLoading = true;

        delay(2000).then(() => {
          comments[index].likes = comments[index].isLike
            ? comments[index].likes - 1
            : comments[index].likes + 1;
          comments[index].isLike = !comments[index].isLike;
          comments[index].isLikeLoading = false;
          renderComments({ comments });
        }),
        renderComments({ comments });
      });
    }
  };