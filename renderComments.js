export const renderComments = ({ commentsArray, listElement, likeButtonClick, commentClick , state}) => {
    const commentsHtml = commentsArray
        .map((user, index) => {
            return `<li class="comment" >
          <div class="comment-header">
            <div class="comment-name">${user.name}</div>
            <div>${user.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
            ${user.comment}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${user.like}</span>
              <button data-index="${index}" class="like-button  ${user.isLike ? "-active-like" : ""
                }"></button>
            </div>
          </div>
        </li>`;
        })
        .join("");

     
    listElement.innerHTML = state?"":commentsHtml;
    likeButtonClick();
    commentClick();
};