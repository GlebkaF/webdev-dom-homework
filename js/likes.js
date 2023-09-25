// Функция лайка
import {renderList} from "./render.js";

export function likeListener ({commentsArray, commentsElement}) {
    const likeElements = document.querySelectorAll('.like-button');
    for (let like of likeElements) {
      like.addEventListener("click", (event) => {
          event.stopPropagation();
          const index = like.dataset.index;
          if (commentsArray[index].isLiked === false) {
            commentsArray[index].isLiked = true;
            commentsArray[index].likes++;
          } else {
            commentsArray[index].isLiked = false;
            commentsArray[index].likes--;
          }
          renderList({commentsArray, commentsElement})
      });
    }
  }; 

  // Функция для окрашивания лайка в зависимости от значения activeLike
  export function activeLike (comment) {
      if (comment.isLiked === true) {
        return '-active-like';
      };
  };