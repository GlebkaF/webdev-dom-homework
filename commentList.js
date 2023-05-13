const appEl = document.querySelector(".container");

export const renderTasksList = ({root, comments}) =>{
  const listComment = comments.map((user, index) => {
    return `<li data-index="${index}" class="comment">
    <div class="comment-header">
      <div>${user.author.name}</div>
      <div>${new Date(user.date).toLocaleString()}</div>
    </div>
    <div data-index="${index}" class="comment-body">
      <div class="comment-text">
        ${user.text}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${user.likes}</span>
        <button data-index="${index}"class="like-button ${user.likeComment ? '-active-like' : ''}"></button>
      </div>
    </div>
  </li>`;
  }
  ).join("");

  const appAddForm =
  `<ul class="comments">
  ${listComment}
  <div class="form-autoriz">Чтобы добавить комментарий, <button class ="autoriz">авторизуйтесь</button></div>
  </ul>
  <div class="add-form">
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите ваше имя"
    />
    <textarea
      type="textarea"
      class="add-form-text"
      placeholder="Введите ваш комментарий"
      rows="4"
    ></textarea>
    <div class="add-form-row">
      <button class="add-form-button">Написать</button>
    </div>
    <div class="add-form-row">
      <button class="delete-form-button">Удалить последний комментарий</button>
    </div>
  </div>`
  root.innerHTML= appAddForm;
};
