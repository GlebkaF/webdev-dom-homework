import { listComment } from "./commentList.js";
export const renderLike = (comments, element) => {
    const likeHtml = comments.map((comment, index) => listComment(comment, index)).join("");
    element.innerHTML = likeHtml;
  };