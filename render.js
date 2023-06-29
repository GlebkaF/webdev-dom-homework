import{quotation} from "./index.js";
import {addFormElement} from "./index.js";
import {comments} from "./index.js"
//import { likeCommentButton } from "./index.js";

 const renderComments  = (element, getCommentsList) => {
  
     const commentsHTML = comments
     .map((comment, index) => getCommentsList (comment, index)).join('');
     element.innerHTML = commentsHTML;
    addFormElement.classList.remove('hide');

function likeCommentButton() {    
 const likesButton = document.querySelectorAll('.like-button');

for (const like of likesButton) {
   like.addEventListener("click", (event) => {
    event.stopPropagation();
   const likeIndex = like.dataset.index;
    const commentsElement = comments[likeIndex];
            
    if (commentsElement.likeComment) {
    commentsElement.likesNumber -= 1;
    commentsElement.likeComment = false;
    commentsElement.propertyColorLike = 'like-button -no-active-like';           
  } else {
    commentsElement.likesNumber += 1;
   commentsElement.likeComment = true;
    commentsElement.propertyColorLike = 'like-button -active-like';                  
    }
renderComments(element, getCommentsList);
 })
}
console.log (2)
};

   likeCommentButton();
     quotation();


     } 
export default renderComments;

