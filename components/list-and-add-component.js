export function renderListComponent({ usersHtml, appEl }) {
    let appHtml = `
        <ul class="comments" id="comment-list">
          ${usersHtml}
          </ul>
          <div class="add-form-row" style="justify-content: center" >
            <button class="add-form-button" id="delete-button">Удалить комментарий</button>
          </div>
      <div id="add">
        <div class="add-form">
          <input
            id="name-input"
            type="text"
            class="add-form-name"
            placeholder="Введите ваше имя"
          />
          <textarea
            id="comment-text"
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш коментарий"
            rows="4"
          ></textarea>
          <div class="add-form-row">
            <button class="add-form-button" id="write-button">Написать</button>
          </div>
        </div>
      </div>
      <div id="load" class="hidden">
        <h3 style="font-family: Helvetica; color: #ffffff;">Комментарий добавляется...</h3>
      </div>`
    appEl.innerHTML = appHtml;
}