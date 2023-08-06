let users = [];
export const renderUsers = ({ addLike, answer, commentsElement }) => {
    const userHtml = users.map((user, index) => {
      return `<li id="last-element" class="comment">
      <div class="comment-header">
          <div>${user.author.name}</div>
          <div>${date(user.date)}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${user.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${user.likes}</span>
            <button class="${getLikeClass(user.isLiked)}"></button>
          </div>
        </div>
      </li>`
    }).join("");
    commentsElement.innerHTML = userHtml;
    addLike();
    answer();
  };