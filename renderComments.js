const renderComments = () => {
    const commentsHtml = usersComments
      .map((user, index) => {
        (user.Iliked) ? Iliked = '-active-like' : Iliked = '';
        return `<li class="comment" data-id="${index}">
        <div class="comment-header">
          <div>${user.name}</div>
          <div>${user.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${user.comment}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${user.likes}</span>
            <button class="like-button ${Iliked}" data-id="${index}"></button>
          </div>
        </div>
      </li>`;
      })
      .join("");
  
    boxOfComments.innerHTML = commentsHtml;
    initEventListeners();
    commentClickListener()
};

renderComments()