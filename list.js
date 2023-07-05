export const getList = (comment, index)=>{
  return `<li class="comment" data-index='${index}'>
    <div class="comment-header">
      <div>${comment.name}</div>
      <div>${comment.dateСreation}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${comment.text}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${comment.likesNumber}</span>
         <button data-index= '${index}'  class='${comment.colorLikes}'></button> 
      </div>
    </div>
  </li>`;
}
// export {getList};

 