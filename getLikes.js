import { toogleLikes } from "./api.js";
import { getTodo } from "./main.js";

//Функция для имитации запросов в API для кнопки лайка
// function delay(interval = 300) {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve();
//       }, interval);
//     });
//   } 

// Добавление лайка
export const getLikes = ({ comments, renderComments }) => {
  const likeButtons = document.querySelectorAll('.like-button');

  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      likeButton.style.animation = 'rotating 2s linear infinite';

      const commentIndex = parseInt(likeButton.dataset.index);
      // console.log(commentIndex);
      const comment = comments[commentIndex];

      const id = likeButton.dataset.id;

      toogleLikes({ id }).then(() => {
        // comment.likes = comment.isLiked
        // if (!comment.isLiked) {
        //   comment.counter += 1;
        //   comment.isLiked = true;

        // } else {
        //   comment.counter -= 1;
        //   comment.isLiked = false
        // }
        getTodo();
      });
    });
  }

}