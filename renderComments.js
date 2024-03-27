import { commentsElement } from "./main.js";
import { getLikeButton } from "./main.js";

const renderComments = (comments, listComments) => {
  const commentsHtml = comments.map((comments, index) => listComments(comments, index)).join("");

  commentsElement.innerHTML = commentsHtml;
  getLikeButton();
};

export default renderComments;
