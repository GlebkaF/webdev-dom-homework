import { token } from "./api.js";
import {renderComments} from "./renderComments.js"

function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
  }

export const initLikeButtonListener = (comments) => {
  if (!token) return;
  // console.log("initLikeButtonListener")
  const likeButtonElements = document.querySelectorAll(".like-button");
  likeButtonElements.forEach((el, index) => {
    el.addEventListener("click", () => {
      el.classList.add("-loading-like");
      delay(2000)
        .then(() => {
          comments[index].like_active = !comments[index].like_active;
          comments[index].like_active
            ? comments[index].like_count++
            : comments[index].like_count--;
          renderComments(comments);
        })
        .then(() => {
          el.classList.remove("-loading-like");
        });
    });
  });
};
