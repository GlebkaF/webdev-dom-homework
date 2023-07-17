export function renderCommentList(arr, commentsBox, likeFunc, editFunc, answerFunc) {
    const commentsHtml = arr.map((comments, index) => {
        return `<li class="comment">
              <div class="comment-header">
                <div>${comments.userName}</div>
                <div>${comments.currDate}</div>
              </div>
              <div class="comment-body">
                <div data-answer='${index}' class="comment-text">
                  ${(comments.isEdit) ? `<textarea class="comment-edit">${comments.text}</textarea>` : `${comments.text}` }
                </div>
                <button id='edit-button' data-index='${index}' class="add-form-button">${comments.isEdit ? `Сохранить` : 'Редактировать'}</button>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${comments.likes}</span>
                  <button data-like='${index}' class="like-button ${(comments.isLiked) ? `-active-like` : ''}"></button>
                </div>
              </div>
        </li>    
        `
    }).join('')
    

    commentsBox.innerHTML = commentsHtml.replaceAll("→", "<div class='quote'>").replaceAll("←", "</div class='quote'>");
    
    //инициализируем все коллекции в ренедер-функцию
    likeFunc();
    editFunc();
    answerFunc();
}