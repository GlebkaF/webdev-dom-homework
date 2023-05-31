
function renderMain(messages, getCommentList, element) {
  const messagesHtml = messages.map((message, index) => getCommentList(message, index)).join("");
  const appHTML = `
  <ul id="list" class="comments">
  ${messagesHtml}
  </ul>
  <div class="login-link">Чтобы добавить комментарий, <a href="#" class="link" id = "login-link">авторизуйтесь</a></div>
  <div class="add-form hide" id="addForm">
    <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="name-input" />
    <textarea id="comment-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
      rows="4"></textarea>
    <div class="add-form-row">
      <button id="delete-button" class="delete-button">Удалить последний комментарий</button>
      <button id="write-button" class="add-form-button" disabled>Написать</button>
    </div>
  </div>
  <div class="loading"></div>`
  element.innerHTML = appHTML;
}
export default renderMain;