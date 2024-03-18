import { renderComments } from "./renderComments.js";

export const initReplayListener = ({ textEl, comments }) => {
  const replayComments = document.querySelectorAll(".comment-text");
  for (const replayComment of replayComments) {
    replayComment
      .addEventListener("click", (event) => {
        event.stopPropagation();
        const index = replayComment.dataset.index;
        textEl.value = `QUOTE_BEGIN ${comments[index].name} \n ${comments[index].text} QUOTE_END`;
        renderComments(comments);
      });
  }
};

// .then((response) => {
//   if (
//     response.status === "Cannot set properties of null (setting 'value')"
//   ) {
//     throw new Error("Нет авторизации");
//   }
//   return response;
// })
// .catch((error) => {
//   if (error.message === "Нет авторизации") {
//     alert("Чтобы добавить комментарий, авторизуйтесь");
//     console.warn(error);
//     return;
//   }
// })