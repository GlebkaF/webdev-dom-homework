const listElement = document.getElementById('list');

export const renderComments = ({ comments, checkInput, initEventListeners, initCommentingListeners, editCommentListeners }) => {
  const commentsHtml = comments.map((comment, index) => { 
     return `<li class="comment">
         <div class="comment-header">
           <div id="name-input">${comment.name}</div>
             <div>${comment.date}</div> 
         </div>
         <div class="comment-body">
          ${(comment.isEdit) ? `<textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4" value="">${comment.text}</textarea>` : 
          `<div id="comment-input" class="comment-text">
            ${comment.text}
          </div>`}
        </div>
        <div class="comment-footer">
           <button class="edit-button edit-form-button" data-index="${index}">${(comment.isEdit) ? "Сохранить" : "Редактировать"}</button>
          
          <div class="likes" data-name="${comment.name}" data-like="${comment.likes}" data-isLiked="${comment.isLiked}">
            <span class="likes-counter">${comment.likes}</span>
            <button id="like-button" class="like-button ${(comment.isLiked) ? "-active-like" : ""}"></button>
           </div>
        </div>
      </li>`
  }).join("");

  listElement.innerHTML = commentsHtml;
  checkInput();
  initEventListeners();
  initCommentingListeners();
  editCommentListeners();
}