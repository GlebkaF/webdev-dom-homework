import { renderComments } from "./renderComments.js";
import {comments, setComments} from "./main.js";

export const initEventlikes = () => {
  const likeButtons = Array.from(document.querySelectorAll(".like-button"));
  const likeCount = Array.from(document.querySelectorAll(".likes-counter"));
  likeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      button.classList.toggle("-active-like");
      const current = Number(likeCount[index].innerHTML);
      const plus = button.classList.contains("-active-like") ? 1 : -1;
      likeCount[index].innerHTML = current + plus;
    });
  });
};

export const initDeliteButtonsListeners = () => {
  const deleteButtonElement = document.querySelector(".delete-button");
  deleteButtonElement.addEventListener("click", () => {
    const deleteComment = comments;
    deleteComment.pop();
    setComments(deleteComment);
    renderComments();
  });
};
