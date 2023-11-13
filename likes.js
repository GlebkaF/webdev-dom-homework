import { renderComments } from "./render.js";

export const getLike = (index) => {
    if (!comments[index].isLiked) {
      comments[index].likes++
    } else {
      comments[index].likes--
    }
    comments[index].isLiked = !comments[index].isLiked;
    renderComments()
  }