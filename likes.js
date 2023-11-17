import { renderComments } from "./render.js";
import { comments } from "./constants.js";
export const getLike = () => {
  let likes = document.querySelectorAll('.like-button')
  likes.forEach(el => {
    el.addEventListener("click", () => {
      if (!comments[el.id].isLiked) {
        comments[el.id].likes++
      } else {
        comments[el.id].likes--
      }
      comments[el.id].isLiked = !comments[el.id].isLiked;
      renderComments()
      getLike()
    })
  })
  }