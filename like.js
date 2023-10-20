import { renderComments } from "./renderComments.js";

export function likeEventButton({ comments }) {
    const likeButtons = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) =>{
      event.stopPropagation();
      const index = likeButton.dataset.index;
    if (index !== null) {
      const comment = comments[index];
      if (!comment.isLiked) {
        comment.isLiked = true;
        comment.likes++;
      } else {
        comment.isLiked = false;
        comment.likes--;
      }
      
    renderComments({ comments }); // После обновления лайков перерисовываем комментарии

      }
    });  
  }
}