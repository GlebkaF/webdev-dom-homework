import { descrElement } from "./api.js";
import { renderList } from "./render.js";

export function changeComment() {
  const changeTextComment = document.querySelectorAll(".comment-text");

  for (const changeTextCommen of changeTextComment) {
    changeTextCommen.addEventListener("click", () => {
      let text = changeTextCommen.dataset.text;
      descrElement.innerHTML = changeTextCommen.dataset.text;
      renderList();
    });
  }
}
