import { renderFunction } from "./renderFunction.js";

export const likedFunction = ({ comments, apiCommentsGet }) => {
  const likeButtons = document.querySelectorAll(".like-button");
  // console.log(likeButtons);
  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", () => {
      const index = likeButton.dataset.index;
      //console.log();
      if (comments[index].isLiked === true) {
        comments[index].like--;
        comments[index].isLiked = false;
      } else if (comments[index].isLiked === false) {
        comments[index].like++;
        comments[index].isLiked = true;
      }

      renderFunction({ comments });
      const downloadAlert = document.querySelector("h2");
      downloadAlert.style = "display: none";
    });
  }
};
