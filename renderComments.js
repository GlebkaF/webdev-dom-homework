import { commentos } from "./api.js";
import initLikeButtonsListeners from "./initLike.js";

const renderComments = (element, getListComments) => {

    const commentsHtml = commentos.map((comment, index) => getListComments(comment, index)).join('');
  
    element.innerHTML = commentsHtml;

    initLikeButtonsListeners();
  };

  export default renderComments;