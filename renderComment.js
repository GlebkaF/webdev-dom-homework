import { fetchComments } from './api.js';
let comments = [];
const renderLike = (commentElement, commentInfo) => {
  const likeHtml = comments.map((comment, index) => commentInfo(comment, index)).join("");
  commentElement.innerHTML = likeHtml;
};
fetchComments();
 export default renderLike;