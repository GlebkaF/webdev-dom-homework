const getCommentsList = (comment, index) => {
    return   `<li class = 'comment' class = 'whiteSpace'   data-index ="${index}"> <div class = 'comment-header'>
        <div>${comment.name}</div> 
        <div>${comment.dateCreation}</div>
       </div>  
       
           <div class = 'comment-body'>
         <div class = "comment-text">
         ${comment.textElement}
         </div>
         </div>
       
       
         <div class = "comment-footer" >
           <div class = 'likes'>      
               <span class="likes-counter">${comment.likesNumber}</span>
           <button data-index = '${index}' class=" like-button ${comment.propertyColorLike}"></button>
                   </div> 
       </div>`;
 };

export {getCommentsList};