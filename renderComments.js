import { commentos } from "./api.js";
import initLikeButtonsListeners from "./initLike.js";

const renderComments = (element, getListComments) => {

    const commentsHtml = commentos.map((comment, index) => getListComments(comment, index)).join('');
  
    let comments = document.querySelector(".comments");
  
    element.innerHTML = commentsHtml;

    initLikeButtonsListeners();
  };

  export default renderComments;