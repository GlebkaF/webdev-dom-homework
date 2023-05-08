import getListElemenets from "./list.js";
import { comment, listElement } from "./api.js";
import { initButtonsLikes } from "./buttonLikesElement.js";
import { changeComment } from "./changeComments.js";
export const renderList = () => {
  const commentListComment = comment.map((comment, index) => getListElemenets(comment, index)).join("");

  listElement.innerHTML = commentListComment;
  initButtonsLikes();
  changeComment();
};
