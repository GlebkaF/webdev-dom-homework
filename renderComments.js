export function Comments(comments){
    const listCommentsElement = document.getElementById('comments-list');
    const commentsHtml = comments
        .map((comment, index) => {
            return `<li data-index="${index}" class="comment">
        <div class="comment-header}">
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
            <span class="likes-counter">${comment.likesCount}</span>
            <button data-index="${index}" class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
          </div>
        </div>
      </li>`;
        })
        .join("");

    listCommentsElement.innerHTML = commentsHtml;
}