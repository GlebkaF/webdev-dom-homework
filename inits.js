import { comments } from "./main.js";
import { addFormText } from "./add-form.js";
import { renderComments } from "./renderComments.js";


export const initCommentsListeners = () => {
  const commentsElements = document.querySelectorAll(".comment");
  for (const commentElement of commentsElements) {
    commentElement.addEventListener("click", () => {
      const index = commentElement.dataset.index;
      addFormText.value = `BEGIN_QUOTE ${comments[index].name}: \n ${comments[index].text} QUOTE_END `;
    });
  }
};

export const initLikeButtonsListeners = () => {
  const likeButtonsElements = document.querySelectorAll(".like-button");
    for (const likeButtonElement of likeButtonsElements) {
      likeButtonElement.addEventListener("click", (event) => {
          event.stopPropagation();
          const index = likeButtonElement.dataset.index;
          comments[index].isLiked = !comments[index].isLiked;
          comments[index].isLiked ? comments[index].likesCounter++ : comments[index].likesCounter--;
          
          renderComments();
      });
    }
}; 



