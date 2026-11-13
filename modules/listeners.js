import { postFetchFunction } from "./api.js";
import { commentsRender } from "./render.js";
import { validateInput } from "./utils.js";
import { comments } from "./data.js";
import { delay } from "./utils.js";
const commentsContainer = document.querySelector(".comments");
const commentInput = document.querySelector(".add-form-name");
const commentText = document.querySelector(".add-form-text");
const commentBtn = document.querySelector(".add-form-button");

export const clickCommentContainer = () => {
  return commentsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("like-button")) {
      const index = Number(e.target.dataset.index);
      const comment = comments[index];
      if (e.target) e.target.classList.add("-loading-like");
      delay(2000)
        .then(() => {
          comment.likes = comment.isLiked
            ? comment.likes - 1
            : comment.likes + 1;
          comment.isLiked = !comment.isLiked;
          comment.isLikeLoading = false;
        })
        .then(() => {
          e.target.classList.remove("-loading-like");
          commentsRender();
        });
    }
  });
};

export const commentInputClick = () => {
  return commentInput.addEventListener("input", () => {
    validateInput();
  });
};

export const commentTextClick = () => {
  commentInput.addEventListener("input", () => {
    validateInput();
  });
};

export const commentBtnClick = () => {
  return commentBtn.addEventListener("click", () => {
    if (commentInput.value === "" || commentText.value === "") {
      alert("Заполните поля");
      return;
    }

    commentBtn.disabled = true;
    commentBtn.textContent = "Добавление комментария...";
    postFetchFunction();
  });
};

export const newCommentContainerClick = () => {
  return commentsContainer.addEventListener("click", (e) => {
    const newCommentForm = e.target.closest(".comment");
    if (e.target.classList.contains("like-button")) {
      return;
    } else if (newCommentForm) {
      const commentForm = newCommentForm.dataset.index;
      const commentArr = comments[commentForm];
      const commentName = commentArr.author.name;
      const commentTextForm = commentArr.text;
      commentText.value = `> ${commentName}, ${commentTextForm}\n\n `;
      validateInput();
      commentText.focus();
    }
  });
};
