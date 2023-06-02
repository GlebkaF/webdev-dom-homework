import comments from "./main.js";
import onCommentLikeClick from "./main.js";
import onCommentEditClick from "./main.js";
import onCommentFeedbackClick from "./main.js";

const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
     let likeClass = comment.active ? "-active-like" : "";
     return `<li class="comment">
           <div class="comment-header">
             <div id ="name">${comment.name}</div>
             <div>${comment.date} </div>
           </div>
           <div class="comment-body">
             <div id = "text" data-index="${index}" class="comment-text" style={{ whiteSpace: 'pre-line' }}>
               ${comment.text}
             </div>
           </div>
           <div class="comment-footer">
             <button data-index="${index}" class="edited-button">Редактировать</button>
             <div class="likes">
               <span class="likes-counter">${comment.like}</span> ${comment.like === 1 ? 'лайк' : 'лайков'}
               <button data-index="${index}" class="like-button ${likeClass}"></button> 
             </div>
           </div>
         </li>`
     }).join('');
     listElement.innerHTML = commentsHtml;
     onCommentLikeClick();
     onCommentEditClick();
     onCommentFeedbackClick();
   }

   export default renderComments;