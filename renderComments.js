export const renderComments = () => {
 const commentsHtml = comments
  .map((comment, index) => {
   return `<li data-index="${index}" class="comment">
    <div class="comment-header">
     <div>${comment.name}</div>
     <div>${comment.timestamp}</div>
    </div>
    
    <div class="comment-body">
     <div class="comment-text">
      ${comment.text
       .replaceAll("BEGIN_QUOTE", "<div class='quote'>")
       .replaceAll("QUOTE_END", "</div>")
      }
     </div>
    </div>

    <div class="comment-footer">
     <div class="likes">
      <span class="likes-counter">${comment.likesCounter}</span>
      <button data-index="${index}" class="like-button ${comment.isLiked===true?'-active-like':''}">
      </button>
     </div>
    </div>
   </li>`;
  })
 .join("");

 listElement.innerHTML = commentsHtml;

 initCommentsListeners();
 initLikeButtonsListeners();
};