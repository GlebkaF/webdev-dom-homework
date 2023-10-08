export function renderListOfComments(array, commentsList){
    let listOfElements = array.map((element, index) => {
        return `<li data-index="${index}" class="comment">
          <div class="comment-header">
            <div>${element.name}</div>
            <div>${element.data}</div>
          </div>
          <div class="comment-body">
            ${element.isEdit ? ` <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4">${element.comment}</textarea>` : `<div class="comment-text">${element.comment}</div>`}
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${element.like}</span>
              <button class="like-button ${element.isLiked ? "-active-like" : ""}"></button> 
            </div>
          </div>
          <div class="block-btn">
            <button class="change-comment-button">${element.isEdit ? "Сохранить" : "Редактировать"}</button>
            </div>
        </li>`;
      })
        .join("");
      commentsList.innerHTML = listOfElements;
}

