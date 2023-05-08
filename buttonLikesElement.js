import { comment } from "./api.js";
import { renderList } from "./render.js";

export function initButtonsLikes() {
  const numberLikesElements = document.querySelectorAll(".like-button");

  for (const numberLikesElement of numberLikesElements) {
    numberLikesElement.addEventListener("click", () => {
      // 1. (+) Мы храним список студентов в js массиве
      // 2. (+) При клике мы удаляем нужный элемент из массива
      // 3. (+) На основе нового массива в js формируем html разметку списка

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
