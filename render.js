import{likeCommentButton, quotation} from "./index.js";
import {addFormElement} from "./index.js";
import {comments} from "./index.js"


 const renderComments  = (element, getCommentsList) => {
 
     const commentsHTML = comments
     .map((comment, index) => getCommentsList (comment, index)).join('');
     element.innerHTML = commentsHTML;
    addFormElement.classList.remove('hide');
    likeCommentButton();
     quotation();
     likeCommentButton();
     } 
export default renderComments;

