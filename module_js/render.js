import { comments, buttonElement, textInputElement } from "./variables.js";

function renderComments(array) {
  const appEl = document.getElementById("app");

  const commentsHtml = array.map((comment, index) => {
      let activeLike = "";
      if (array[index].isLiked) {
        activeLike = "-active-like";
      }
      return `
        <li class="comment">
            <div class="comment-header">
            <div id="commentName">${comment.name}</div>
            <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text"  id="commentText">${comment.text}</div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter" >${comment.likes}</span>
                <button class="like-button ${activeLike}" data-index='${index}'></button>
              </div>
            </div>
          </li>`;
    })
    .join("");

  const appHtml = `
      <div class="container">
        <div class="add-form" id="form">
          <h2>Форма для авторизации</h2>
          <input
            type="text"
            class="user__login"
            placeholder="Введите логин"
            id="login" />
          <textarea
            type="password"
            class="user__password"
            placeholder="Введите пароль"
            rows=""
            id="password"></textarea>
          <div class="add-form-row">
            <button class="add-form-button" id="user__button">Войти</button>
          </div>
        </div>
        <ul class="comments" id="comments-list">${commentsHtml}</ul>
        <div class="add-form" id="form">
          <input
            type="text"
            class="add-form-name"
            placeholder="Введите ваше имя"
            id="user-name" />
          <textarea
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш коментарий"
            rows="4"
            id="user-text"></textarea>
          <div class="add-form-row">
            <button class="add-form-button" id="button-form">Написать</button>
          </div>
        </div>
        <div>
          <button class="add-form-button" id="delete-button">
            Удалить последний комментарий
          </button>
        </div>
      </div>`;

  appEl.innerHTML = appHtml;

  buttonElement.addEventListener("click", () => {
    buttonElement.classList.remove("add-form-button-error");
    buttonElement.classList.add("add-form-button");
    nameInputElement.classList.remove("error");
    textInputElement.classList.remove("error");

    if (nameInputElement.value === "" || textInputElement.value === "") {
      buttonElement.classList.remove("add-form-button");
      buttonElement.classList.add("add-form-button-error");

      if (nameInputElement.value === "") {
        nameInputElement.classList.add("error");
      }
      if (textInputElement.value === "") {
        textInputElement.classList.add("error");
      }

      return;
    }

    buttonElement.disabled = true;
    buttonElement.textContent = "Элемент добавлятся...";

    getPost();
  });

  initLike(array);
  copyComment();
}

function copyComment() {
  const commentsElement = document.querySelectorAll(".comment");

  for (const comment of commentsElement) {
    comment.addEventListener("click", () => {
      textInputElement.value =
        `> ${comment
          .querySelector(".comment-text")
          .innerHTML.replaceAll("&amp;", "&")
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">")
          .replaceAll("&quot;", '"')}` +
        `\n\n${comment
          .querySelector(".comment-header")
          .children[0].innerHTML.replaceAll("&amp;", "&")
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">")
          .replaceAll("&quot;", '"')}`;
    });
  }
}

function initLike(array) {
  const likeButtonElements = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtonElements) {
    const index = likeButton.dataset.index;
    likeButton.addEventListener("click", (e) => {
      e.stopPropagation();

      if (array[index].isLiked) {
        array[index].likes--;
      } else {
        array[index].likes++;
      }
      array[index].isLiked = !array[index].isLiked;

      renderComments(array);
    });
  }
}

export { renderComments };
