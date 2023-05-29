import { commentos } from "./api.js";


const getListComments = (comment, index) => {
    return `<li class="comment" data-id='${comment.id}'>
    <div class="comment-header">
      <div>${comment.name}</div>
      <div>${comment.date}
      </div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${comment.text}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter" data-id='${comment.id}'>${commentos[index].likes}</span>
        <button 
        class="like-button ${comment.isLiked ? '-active-like' : ''}" 
        data-index='${index}'>
        </button>
      </div>
    </div>
    <button class='correct-form-button' data-id='${comment.id}'>Редактировать</button>
  </li>`;
};

export { getListComments };