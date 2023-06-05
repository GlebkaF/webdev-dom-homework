function renderMain(messages, element, token, user) {
  const messagesHtml = messages.map((message, index) => getCommentListMain(message, index,token, user)).join("");
  const appHTML = `
  <ul id="list" class="comments">
  ${messagesHtml}
  </ul>
  ${token ? "" : '<div class="login-link">Чтобы добавлять комментарии, <a href="#" class="link" id = "login-link">авторизуйтесь</a></div>'}
  ${token ? `<div class="add-form" id="addForm">
      <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="name-input" />
      <textarea id="comment-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
        rows="4"></textarea>
      <div class="add-form-row">
      <a href="#" class="link" id = "exit">Выход</a>
        <button id="write-button" class="add-form-button" disabled>Написать</button>
      </div>
    </div>
    <div class="loading"></div>` : ""}`

  element.innerHTML = appHTML;
  return;
}
export default renderMain;

function getCommentListMain(message, index, token, user) {
  let like = (message.liked) ? 'like-button -active-like' : 'like-button';
  let edit = (message.isEdit) ? `<textarea type="textarea" class="comment-correction"rows="4">${message.comment}</textarea>` : `<div class="comment-text">${message.comment.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>").replaceAll("\n", "<br>")}</div>`;
  let correctBtn = (message.isEdit) ? `<button data-index="${index}" data-id="${message.commentID}" class="correct-button save-button">Сохранить</button>` : `<button data-index="${index}" class="correct-button">Редактировать</button>`;
  return `<li class="comment" data-index="${index}">
  <div class="comment-header" >
    <div>${message.name}</div>
    <div>${message.time}</div>
  </div>
  <div class="comment-body">
    ${edit}
  </div>
  <div class="comment-footer">
  ${(token && message.login === user.login) ? `<div class="buttons">` : `<div class="buttons hide">`}
${correctBtn}
<button data-id="${message.commentID}" class="delete">Удалить</button>
    </div>
    <div class="likes">
      <span class="likes-counter">${message.likesCount}</span>
      <button data-id="${message.commentID}" class="${like}"></button>
    </div>
  </div>
</li>`;
};