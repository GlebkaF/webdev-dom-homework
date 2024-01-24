export const listElement = document.querySelector ('.comments');

export const renderComments = ({ comments, likeEventListerner, commentEventListener }) => {
    const commentsHtml = comments.map((comment, index) => {
      return `<li class="comment" data-index ="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.time}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.comment}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">
                <div>${comment.like}</div>
              </span>
              <button class="${comment.isLike ? 'like-button -active-like' : 'like-button'}" data-index ="${index}">
              <div></div>
              </button>
            </div>
          </div>
        </li>`
    }).join('');
    listElement.innerHTML = commentsHtml;
    likeEventListerner();
    commentEventListener();
};