import { commentaries } from "./api.js";
import initLikeButtonListeners from "./like.js";

const renderComments=(element, getComments) => {
  const commentsHtml = commentaries.map((comment, index) => getComments(comment, index)).join('');
  element.innerHTML = commentsHtml;
  initLikeButtonListeners();
};

export default renderComments;













