const getCommentsEdit = (comment, index) => {
  return `<li class="comment" data-like='${
    comment.likes
  }' data-index="${index}" >
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.comDate}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text" data-index='${index}'>
          ${
            comment.isEdit == false
              ? comment.comText
              : `<textarea
      id="edit-text"
      type="textarea"
      class="add-form-text edit-text"
      placeholder="Введите ваш коментарий"
      rows="4"
    >${comment.comText}</textarea>`
          }
        </div>
      </div>
      <div class="comment-footer"> ${
        comment.isEdit == false
          ? `<button class="edit-comment" data-index="${index}">Редактировать</button>`
          : `<button  class="save-comment" data-index='${index}'>Сохранить</button>`
      }
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button data-index='${index}' class="like-button  ${
    comment.isLiked ? "-active-like" : ""
  }"></button>
        </div>
      </div>
    </li>`;
};
  
export { getCommentsEdit };
