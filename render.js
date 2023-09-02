export const renderComments = ({comments}) => {
  let commentsElement = document.getElementById("comments");
  const newComments = comments.map((comment, index) => {
    return `<li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
          ${comment.quote ? `<div class=quote> ${quote}</div>` : ""}
          ${comment.changeButton ?
        `<textarea
            tipe = "textarea"
            class = "change-form-text"
            rows = 3
            autofocus> ${comment.text}</textarea>`
        : `<div class="comment-body"  data-text="${comment.text}" data-name="${comment.name}">
                <div class="comment-text">
                  ${comment.text}
                </div>
              </div>`}
        <div class="comment-footer">
          ${comment.changeButton
        ? `<button class="save-comment-button" data-index="${index}">Сохранить</button>`
        : `<button class="change-comment-button" data-index="${index}">Изменить</button>`}
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index="${index}" class='${comment.isLiked ? "like-button -active-like" : "like-button"}'></button>
          </div>
        </div>
      </li>`;
  }).join('');
  commentsElement.innerHTML = newComments;
}