// Функция лайка
import { renderList } from "./render.js";
import { token } from "./login.js";

export function likeListener ({commentsArray, commentsElement}) {
    const likeElements = document.querySelectorAll('.like-button');
    for (let like of likeElements) {
      like.addEventListener("click", (event) => {
          event.stopPropagation();
          const index = like.dataset.index;
          let id = commentsArray[index].id;
          fetch(`https://wedev-api.sky.pro/api/v2/vladimir-rychkov/comments/:${id}/toggle-like`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then((response) => {
            if (response.status === 401) {
              throw new Error('Для этого нужна авторизация')
            }
          })
          .catch((Error) => {
            alert(Error)
          })

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