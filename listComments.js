const getListComments = (comment, index) => {
    return `<li class="comment" data-index="${index}">
    <div class="comment-header">
      <div>${comment.name}</div>
      <div>${comment.eachDate}</div>
    </div>
    <div class="comment-body">
      <div class="${comment.isEdit ? 'display-none' : 'comment-text'}">
        ${comment.text}
      </div>
    </div>
    <div>
    <textarea type="textarea" class="${comment.isEdit ? 'add-form-text' : 'display-none'}" rows="4">${comment.text}</textarea>
    </div>
    <div class="comment-footer">
      <div class="redact">
        <button class="${comment.isEdit ? 'display-none' : 'redact-button'}" data-index="${index}">Редактировать</button>
      </div>    
      <div class="redact">
        <button class="${comment.isEdit ? 'save-button' : 'display-none'}" data-index="${index}">Сохранить</button>
      </div>      
      <div class="likes">
        <span class="likes-counter">${comment.like}</span>
        <button class="${comment.classLike}" data-index="${index}"></button>
      </div>
    </div>
  </li>`;
}
export {getListComments};