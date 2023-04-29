const commentInfoEdit = (comment, index) => {
    return ` <li data-index="${index}" class="comment">
       <div class="comment-header">
         <div>${comment.name}</div>
         <div>${comment.data}</div>
       </div>
       <div data-index="${index}" class="comment-body">
         <div class="comment-text">
           ${comment.text}
         </div>
       </div>
       <div class="comment-footer">
         <div class="likes">
           <span class="likes-counter">${comment.countLike}</span>
           <button data-index="${index}"class="like-button ${comment.likeComment ? '-active-like' : ''}"></button>
         </div>
       </div>
     </li>`;
   };

   const commentInfoNotEdit = (comment, index) => {
    return ` <li data-index="${index}" class="comment">
       <div class="comment-header">
         <div>${comment.name}</div>
         <div>${comment.data}</div>
       </div>
       <div data-index="${index}" class="comment-body">
         <div class="comment-text">
           ${comment.text}
         </div>
       </div>
       <div class="comment-footer">
         <div class="likes">
           <span class="likes-counter">${comment.countLike}</span>
           <button data-index="${index}"class="like-button ${comment.likeComment ? '-active-like' : ''}"></button>
         </div>
       </div>
     </li>`;
   };

   export{ commentInfoEdit, commentInfoNotEdit };