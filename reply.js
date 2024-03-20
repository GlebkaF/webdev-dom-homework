import { userLogin } from "./renderLogin.js";

export const initReplayListener = ({ comments }) => {
  if (!userLogin) return;
  const textEl = document.getElementById("add-form-text");
  const replayComments = document.querySelectorAll(".comment-text");
  for (const replayComment of replayComments) {
    replayComment.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = replayComment.dataset.index;
      textEl.value = `QUOTE_BEGIN ${comments[index].name} \n ${comments[index].text} QUOTE_END`;
    });
  }
};