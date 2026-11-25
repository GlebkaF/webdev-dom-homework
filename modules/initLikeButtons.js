import { comments } from './comments.js';

// onUpdate — функция, которая перерисует список (её передает render.js)
export function initLikeButtons(onUpdate) {
  const likeButtons = document.querySelectorAll('.like-button');

  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', (event) => {
      event.stopPropagation();

      const comment = comments[likeButton.dataset.index];

      if (comment.isLiked) {
        comment.likes--;
      } else {
        comment.likes++;
      }
      comment.isLiked = !comment.isLiked;

      onUpdate();
    });
  }
}