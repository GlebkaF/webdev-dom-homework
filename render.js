
export function render ({commentsData, listElement}) {
    const commentsHtml = commentsData.map ((comment, index) => {
        return `<li class="comment" data-index = "${index}">
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
              <span data-index = "${index}" class="likes-counter">${comment.likes}</span>
              <button data-index = "${index}" class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
            </div>
          </div>
        </li>`
      }).join('');
      listElement.innerHTML = commentsHtml;

}