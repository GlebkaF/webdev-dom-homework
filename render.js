export const renderComments = (commentsList, comments) => {
    
    commentsList.innerHTML = "";
    

    comments.forEach((comment) => {
        const newComment = document.createElement("li");
        newComment.classList.add("comment");
        
        const likeButtonClass = comment.liked ? "like-button -active-like" : "like-button";
      
          const dateAndTime = `${comment.date.toLocaleDateString()} ${comment.date.toLocaleTimeString()}`;
          newComment.innerHTML = `
            <div class="comment-header">
              <div>${comment.name}</div>
              <div>${dateAndTime}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${comment.text}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="${likeButtonClass}" data-comment-id="${comment.id}"></button>
                <div class="edit-buttons">
            <button class="edit-button" data-comment-id="${comment.id}">Редактировать</button>
              </div>
            </div>
          `;
      
          newComment.addEventListener("click", () => {
          // При клике на комментарий, заполняем поля формы добавления комментария данными комментария
          nameInput.value = '';
          commentInput.value = `@${comment.name}, ${comment.text}:`;
          commentInput.focus();
          });
          commentsList.appendChild(newComment);
        });
      
};