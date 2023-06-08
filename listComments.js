export function getListComments (comment, index, getDate, isRegistered) {
    return `<li class="comment" data-index='${index}'>
        <div class="comment-header">
          <div>${comment.name
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")}</div>
          <div>${
            getDate(comment.date)}</div>
        </div>
        <div class="comment-body">
          ${comment.isEdit ? `<textarea type="textarea" class="add-form-text" rows="4"
        id="textInput">${comment.text}</textarea>` : `<div class="comment-text">
            ${comment.text
            .replaceAll('QUOTE_BEGIN', "<div class='quote'>")
            .replaceAll('QUOTE_END', '</div>')
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")}
          </div>`}          
        </div>
        <div class="comment-footer">
          <div class="edit">
          ${isRegistered ? `<button data-id='${comment.id}' class="delete-button">Delete</button>` : ''}            
          </div>
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index='${index}' class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
          </div>
        </div>  
      </li>`;
  };

