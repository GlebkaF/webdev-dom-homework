import {commentElement} from "./main.js";
import {getLikeButton,changeComment} from "./main.js";

const renderComments = (comments, list) => {
const commentsHtml = comments.map((comment, index) => list(comment, index)).join(""); 
commentElement.innerHTML = commentsHtml;
getLikeButton();
changeComment();

};
export default renderComments;