const renderUserComments = ({userComments, userComment}) => {
    userComments.innerHTML = userComment.map((comments, index) => {
      const commentText = comments.isEdit === true ? `<textarea type="form" class="add-form-text_comment" id="changedText" data-index=${index} rows="4">${comments.comment}</textarea>` : `${comments.comment}`;
      const btnTextChange = comments.isEdit === true ? `Сохранить` : `Редактировать`;

      return `
      <li class="comment" data-index=${index}>
      <div class="comment-header">
        <div>${comments.name}</div>
        <div>${comments.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${commentText.replaceAll(`QUOTE_BEGIN`, "<div class='quote'>").replaceAll(`QUOTE_END`, "</div>")}
        </div>
      </div>
      <div class="comment-footer">
  
        <div class="change">
          <button class="change-button" data-index=${index}>${btnTextChange}</button>
        </div>
  
        <div class="delete">
        <button class="delete-button" data-id=${comments.id}>Удалить</button>
        </div>
  
        <div class="likes">
          <span class="likes-counter">${comments.likes}</span>
          <button class="like-button ${comments.isLike ? "" : "-active-like"}" data-index=${index} data-like=${comments.isLike}></button>
        </div>
      </div>
    </li>`
  }).join('')
};

export {renderUserComments}