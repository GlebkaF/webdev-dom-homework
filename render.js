function renderMain(messages, getCommentList, element, token) {
  const messagesHtml = messages.map((message, index) => getCommentList(message, index)).join("");
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
        <button id="delete-button" class="delete-button">Удалить последний комментарий</button>
        <button id="write-button" class="add-form-button" disabled>Написать</button>
      </div>
    </div>
    <div class="loading"></div>` : ""}` 

  element.innerHTML = appHTML;
  return;
}
export default renderMain;