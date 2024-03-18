const listElement = document.getElementById('list');

export function renderComments ({comments, initLikeButtonListeners, reply, removeValidation, delay}) {
    const commentsHtml = comments.map((comment, index) => {
      return `<li class="comment">
    <div class="comment-header">
      <div data-index="${index}">${comment.name}</div>
      <div>${comment.date}</div>
    </div>
    <div class="comment-body">
      <div data-index="${index}" class="comment-text">
        ${comment.comment}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span id="likes" class="likes-counter">${comment.likesCounter}</span>
        <button id="button-like" data-like="${comment.likesCounter}" data-index="${index}" class="like-button ${comments[index].isLiked ? '-active-like' : ''}"></button>
      </div>
    </div>
    </li>`
    }).join('');
    listElement.innerHTML = commentsHtml;
  
    initLikeButtonListeners({comments, renderComments, reply, removeValidation, delay});
    reply({comments});
    removeValidation();
  };

  

  