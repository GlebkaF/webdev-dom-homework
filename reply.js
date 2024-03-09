import {renderComments} from "./renderComments.js"

export const initReplayListener = ({textEl, comments}) => {
  const replayComments = document.querySelectorAll(".comment-text");
  for (const replayComment of replayComments) {
    replayComment.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = replayComment.dataset.index;
      textEl.value = `QUOTE_BEGIN ${comments[index].name} \n ${comments[index].text} QUOTE_END`;
      renderComments(comments);
    });
  }
};
