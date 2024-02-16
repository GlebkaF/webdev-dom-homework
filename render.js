import { comments } from './main.js';

//переменные для работы
const listElement = document.getElementById("list");


//рендерфункция
export function Render() {
  const commentsHtml = comments.map((comment, index) => {
    return `<li class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class=" ${(comments[index]['original'] != '') ? "comment-original" : ""}">
              ${comment.original}
            </div>
            <div class="${comment.isEdit ? "edit-none" : "comment-text"}" data-index = "${index}">
              ${comment.text}
            </div>
          <div>
            <textarea type="textarea" id="edit-input" class="${comment.isEdit ? "add-form-text" : "edit-none"}" rows="4" >${comment.text}</textarea>
          </div>
            <button class="${!comment.isEdit ? "edit-button" : "edit-none"}" data-index = "${index}" data-id = "${comment.id}" >Редактировать</button>
            <button class="${comment.isEdit ? "edit-committed" : "edit-none"}" data-index = "${index}" data-id = "${comment.id}" >Сохранить</button>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="${comments[index].isLikeLoading ? "loading-none" : "likes-counter"}" >${comment.likesCounter}</span>
              <button class="${comments[index].isLikeLoading ? "like-button -loading-like" : `${comment.itLikes ? "like-button -active-like" : "like-button"}`}" data-index = "${index}"></button> 
            </div>
          </div>
        </li>`;
  }).join('');
  listElement.innerHTML = commentsHtml;
};



//рендерфункция из main.js (до разделения на модули)
/*const renderComments = () => {
  const commentsHtml = comments.map((comment, index) => {
    return `<li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class=" ${(comments[index]['original'] != '') ? "comment-original" : ""}">
            ${comment.original}
          </div>
          <div class="${comment.isEdit ? "edit-none" : "comment-text"}" data-index = "${index}">
            ${comment.text}
          </div>
        <div>
          <textarea type="textarea" id="edit-input" class="${comment.isEdit ? "add-form-text" : "edit-none"}" rows="4" >${comment.text}</textarea>
        </div>
          <button class="${!comment.isEdit ? "edit-button" : "edit-none"}" data-index = "${index}" data-id = "${comment.id}" >Редактировать</button>
          <button class="${comment.isEdit ? "edit-committed" : "edit-none"}" data-index = "${index}" data-id = "${comment.id}" >Сохранить</button>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="${comments[index].isLikeLoading ? "loading-none" : "likes-counter"}" >${comment.likesCounter}</span>
            <button class="${comments[index].isLikeLoading ? "like-button -loading-like" : `${comment.itLikes ? "like-button -active-like" : "like-button"}`}" data-index = "${index}"></button> 
          </div>
        </div>
      </li>`;
  }).join('');
  listElement.innerHTML = commentsHtml;
  InitEventListeners();
  InitCommentListeners();
  InitEditComments();
  InitEditKommitted();
};*/