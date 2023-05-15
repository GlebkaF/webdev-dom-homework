import { comment } from "./api.js";
import { renderList } from "./render.js";

export function initButtonsLikes() {
  const numberLikesElements = document.querySelectorAll(".like-button");

  for (const numberLikesElement of numberLikesElements) {
    numberLikesElement.addEventListener("click", () => {
 

      let index = numberLikesElement.dataset.index;

      if (comment[index].isLiked === false) {
        comment[index].likes += 1;
        numberLikesElement.classList.add("-active-like");
        comment[index].isLiked = true;
      } else {
        numberLikesElement.classList.remove("-active-like");
        comment[index].likes -= 1;
        comment[index].isLiked = false;
      }
      renderList();
    });
  }
}
