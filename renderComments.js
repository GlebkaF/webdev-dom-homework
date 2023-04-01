import { comments, myDate, listElement } from "./index.js";

export const initChangeLikeButtonListeners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
  
    for (const likeButtonElement of likeButtonElements) {
      likeButtonElement.addEventListener('click', (event) => {
        event.stopPropagation();
        const index = likeButtonElement.dataset.index;
  
        if (comments[index].isLike === false) {
          comments[index].likes += 1;
          comments[index].isLike = true;
  
  
        } else {
          comments[index].likes -= 1;
          comments[index].isLike = false;
        }
  
        renderComments(listElement);
      })
    }
  };

  const initEditButtonListeners = () => {
    const editButtons = document.querySelectorAll(".edit-button");
    for (const editButton of editButtons) {
      editButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = editButton.dataset.index;
  
        if (comments[index].isEdit === false) {
          comments[index].isEdit = true;
  
        } else {
          comments[index].isEdit = false;
          const textareaEditElements = document.querySelectorAll(".edit-area-text");
          for (const textareaEditElement of textareaEditElements) {
            comments[index].text = textareaEditElement.value;
          }
        }
        renderComments(listElement);
      })
    };
    const saveButtons = document.querySelectorAll(".save-button");
    for (const saveButton of saveButtons) {
      saveButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = saveButton.dataset.index;
        if (comments[index].isEdit === false) {
          comments[index].isEdit = true;
        } else {
          comments[index].isEdit = false;
          const textareaEditElements = document.querySelectorAll(".edit-area-text");
          for (const textareaEditElement of textareaEditElements) {
            comments[index].text = textareaEditElement.value;
          }
        }
        renderComments(listElement)
  
      });
    }
  };

  export const deleteComment = () => {
    const deleteButtonElements = document.querySelectorAll('.delete-button');
    for (const deleteButtonElement of deleteButtonElements) {
      deleteButtonElement.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = deleteButtonElement.dataset.index;
        comments.splice(index, 1);
        renderComments(listElement);
      });
    }
  };

  const answerQuoteToComment = () => {
    const commentListItems = document.querySelectorAll('.comment');
    for (const commentListItem of commentListItems) {
      commentListItem.addEventListener('click', () => {
        const userName = commentListItem.dataset.name;
        const userComment = commentListItem.dataset.comment;
        textareaElement.value = `*_${userName}: \n${userComment}__*`;
      })
    }
  }

export const renderComments = (element) => {
    const commentHtml = comments.map((comment, index) => {
      return `<li class="comment" data-name='${comment.name}' data-comment='${comment.text}'>
    <div class="comment-header">
      <div>${comment.name}</div>
      <div>${myDate(new Date(comment.date))}</div>
    </div>
    <div class="comment-body">
  
      ${comment.isEdit ? `<textarea class= "edit-area-text" onclick = "event.stopPropagation()">${comment.text}</textarea>` : `<div class="comment-text" data-index='${index}' data-name='${comment.name}' data-comment='${comment.text}'>${comment.text.replaceAll('*_', '<div class="quote">').replaceAll('__*', '</div>')}</div>`}
    
    </div>
    <div class="comment-footer">
     <div class="likes">
      <span class="likes-counter">${comment.likes}</span>
  
      <button class="${comment.isLike ? "like-button -active-like" : "like-button"}" data-index='${index}'></button>
  
      ${comment.isEdit ? `<button class="save-button button-comment" data-index='${index}'>Сохранить</button>` : `<button class="edit-button button-comment" data-index='${index}'>Редактировать</button>`}
      
      <button class = "delete-button button-comment" data-index='${index}'>Удалить комментарий</button>
     </div>
    </div>
  </li>`
    }).join('');
  
    element.innerHTML = commentHtml;
  
    
    initChangeLikeButtonListeners();
    initEditButtonListeners();
    deleteComment();
    //answerToComment(); ДЗ 2.11
    answerQuoteToComment(); // ДЗ со звездочкой 2.11
  }

//   export default renderComments;