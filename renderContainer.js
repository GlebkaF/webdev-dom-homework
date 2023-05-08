const getCommentsEdit = (comment, index) => {
  return `<li class="comment" data-like='${
    comment.likes
  }' data-index="${index}" >
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.comDate}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text" data-index='${index}'>
          ${
            comment.isEdit == false
              ? comment.comText
              : `<textarea
      id="edit-text"
      type="textarea"
      class="add-form-text edit-text"
      placeholder="Введите ваш коментарий"
      rows="4"
    >${comment.comText}</textarea>`
          }
        </div>
      </div>
      <div class="comment-footer"> ${
        comment.isEdit == false
          ? `<button class="edit-comment" data-index="${index}">Редактировать</button>`
          : `<button  class="save-comment" data-index='${index}'>Сохранить</button>`
      }
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button data-index='${index}' class="like-button  ${
    comment.isLiked ? "-active-like" : ""
  }"></button>
        </div>
      </div>
    </li>`;
};
const renderContainer = (comments, element, token) => {

  const commentsHtml = comments
  .map((comment, index) => getCommentsEdit(comment, index))
  .join("");

  if (!token) {
    const containerHtml = ` <ul id="list-comments" class="comments">
<!--Рендерится из JS-->
${commentsHtml}
</ul> 
<div class="authorization">
  <h3 class="authorization__title">Форма входа</h3>
  <input
    id="i"
    type="text"
    class="authorization__login"
    placeholder="Логин"
  />
  <input
    id="password"
    type="password"
    class="authorization__password"
    placeholder="Пароль"
    rows="1"
  ></input>
  <div class="authorization__button">
    <button id="add-button" class="add-form-button">Войти</button>
  </div>
</div>`
element.innerHTML = containerHtml;
  } else {
const containerHtml = ` <ul id="list-comments" class="comments">
<!--Рендерится из JS-->
${commentsHtml}
</ul>
<div class="add-form">
  <input
    id="input-name"
    type="text"
    class="add-form-name"
    placeholder="Введите ваше имя"
  />
  <textarea
    id="add-text"
    type="textarea"
    class="add-form-text"
    placeholder="Введите ваш коментарий"
    rows="4"
  ></textarea>
  <div class="add-form-row">
    <button id="add-button" class="add-form-button">Написать</button>
  </div>
</div>` 
element.innerHTML = containerHtml;
}

  };

  export default renderContainer