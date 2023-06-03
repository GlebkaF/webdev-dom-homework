


const getComments = (comment,index) => {
    if(comment.isLiked) {
        return `<li  class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}"  class="like-button -active-like"></button>
            </div>
          </div>
        </li>`;
    } else {
        return `<li  class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" data-likes=${comment.likes} class="like-button"></button>
            </div>
          </div>
        </li>`;

    }
};

export { getComments };
        
        