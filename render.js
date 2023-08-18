export const renderComments = (commentsList, comments) => {
  console.log(comments);


  commentsList.innerHTML = comments
    .map((comment) => {
      // const newComment = document.createElement('li');
      // newComment.classList.add('comment');

      const likeButtonClass = comment.liked ? 'like-button -active-like' : 'like-button';

      const dateAndTime = `${comment.date.toLocaleDateString()} ${comment.date.toLocaleTimeString()}`;
      return `<li class='comment'>
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
           </li>
          `;
    })
    .join('');

  // Задаем обработчики для взаимодействия с комментом
  //replyInitEvent(newComment, comment);
  likeInitEvent(comments);
};

// Ответ на коммент
function replyInitEvent(newComment, comment) {
  newComment.addEventListener('click', (event) => {
    event.stopPropagation();
    const nameInput = document.querySelector('#name-input');
    const commentInput = document.querySelector('#comment-input');
    // При клике на комментарий, заполняем поля формы добавления комментария данными комментария
    nameInput.value = '';
    commentInput.value = `@${comment.name}, ${comment.text}:`;
    commentInput.focus();
  });
}
// Лайк
function likeInitEvent(comments) {
  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();

      const commentId = parseInt(button.dataset.commentId);
      const comment = comments.find((c) => c.id === commentId);

      if (comment.liked) {
        comment.likes--;
      } else {
        comment.likes++;
      }
      comment.liked = !comment.liked;
      // Обновляем список комментариев на странице

      const commentsList = document.querySelector('.comments');

      renderComments(commentsList, comments);
    });
  });
}
