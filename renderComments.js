const renderComments = () => {
    const commentsHtml = usersComments
      .map((comment, id) => {
        let isLiked = ''
        if (comment.isLiked) {
          isLiked = '-active-like';
        }
        
        date = formatDate(comment.date)
        return `<li class="comment" data-id="${id}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${isLiked}" data-id="${id}"></button>
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



function renderForm(loadedComment) {
  if (loadedComment == true){
    addForm.classList.add('hide')
    loader.classList.remove('hide')
  } if(loadedComment == false){
    loader.classList.add('hide')
    addForm.classList.remove('hide')
  }
}