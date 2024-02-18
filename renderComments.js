export function renderCom(comments) {
    const CommentsHtml = comments.map((comment, index) => {
    let isLike;
    let inputTextHtml;
    let textButtonEditSave;
    let classButtonEditSave;
    //isLoadedPage = true;
    comment.myLike ? isLike = "-active-like" : false
    
    comment.isEdit ? textButtonEditSave = "Сохранить" : textButtonEditSave = "Редактировать"
    comment.isEdit ? classButtonEditSave = "comment-text-save" : classButtonEditSave = "comment-text-edit"
    comment.isEdit ? inputTextHtml = `<textarea id="form-text" type="textarea" class="add-form-text" placeholder="Введите ваш коментарй" rows="4">${comment.text}</textarea>` : inputTextHtml = `<div data-index="${index}" class="comment-text">${comment.text}</div>`;

    
      return `<li class="comment">
              <div class="comment-header">
                <div>${comment.author}</div>
                <div>${comment.date}</div>
              </div>
              <div class="comment-body">
                ${inputTextHtml}
              </div>
              <button data-edit="${index}" class="${classButtonEditSave}">${textButtonEditSave}</button>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${comment.likeCount}</span>
                  <button class="like-button ${isLike}" id="like-button" data-islike="${index}"></button>
                </div>
              </div>
            </li>`;
    
    
            
  }).join("");
  return CommentsHtml;
}