import { renderLogin } from "./renderLogin.js";

function getCommentHTML(comment, index) {
  return `<li class="comment" data-comment="${index}">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button${comment.favorite ? ' -active-like' : ''}" data-index="${comment.id}"></button>
        </div>
      </div>
    </li>`;
}

function getFormHTML(userName, isPosting, postError) {
  return (
    isPosting 
      ? `<span class="input-loader">Комментарий загружается...</span>`
      : `
          <div class="add-form">
            ${postError ? `<span>${postError}</span>` : ''}
            <input
              id="name-input"
              type="text"
              class="add-form-name"
              placeholder="Введите ваше имя"
              value="${userName}"
              disabled
            />
            <textarea
              id="text-input"
              type="textarea"
              class="add-form-text"
              placeholder="Введите ваш коментарий"
              rows="4"
            ></textarea>
            <div class="add-form-row">
              <button disabled class="add-form-button" id="add-button">Написать</button>
            </div>
          </div>
          <button class="add-form-button" id="delete-button">Удалить последний комментарий</button>
        `
  )
}

export const renderComments = (
  app,
  isPosting,
  postError,
  isInitialLoading,
  comments,
  user,
  onPostSubmit,
  onLoginSubmit,
  loginError,
  onToggleLike,
  onDeleteClick
) => {
  const commentsHTML = comments.map(getCommentHTML).join("");
  const appHtml = `
  <div class="container">
    <ul class="comments">
    ${
      isInitialLoading
      ? "<div class='loading'>Загрузка комментариев...</div>"
      : commentsHTML
    }
    </ul>
    ${
      user
        ? getFormHTML(user.name, isPosting, postError)
        : `<div class="form-loading" style="margin-top: 20px">
            Чтобы добавить коимментарий, <a href='#' id="go-to-login" href="">авторизуйтесь</a>
          </div>`
    }
  </div>} `;

  app.innerHTML = appHtml;

  if (!user) {
    const goToLogin = document.getElementById("go-to-login");
    goToLogin.addEventListener("click", (event) => {
      event.preventDefault();
      renderLogin(app, onLoginSubmit, loginError);
    });
  }

  if (user && !isPosting) {
    const addButton = document.getElementById("add-button");
    const textInputElement = document.getElementById("text-input");
    const deleteButtonElement = document.getElementById("delete-button")
    const сommentElements = document.querySelectorAll(".comment");

    addButton.addEventListener("click", () => {
      const text = textInputElement.value;
      if (text) {
        onPostSubmit(text);
      } else {
        textInputElement.classList.add("error");
      }
    });

    textInputElement.addEventListener("input", () => {
      const text = textInputElement.value;

      textInputElement.classList.remove("error");
      if (text) {
        addButton.removeAttribute("disabled");
      } else {
        addButton.setAttribute("disabled", true);
      }
    });

    for (const сommentElement of сommentElements) {
      сommentElement.addEventListener("click", () => {
      const index = сommentElement.dataset.comment;

      textInputElement.value = `<${comments[index].text}
${comments[index].name},`;
      textInputElement.style.whiteSpace = "pre-line";
      })
    }

    deleteButtonElement.addEventListener("click", () => {
      onDeleteClick();
    })
  }

  if (!isInitialLoading) {
    const likeButtonElements = document.querySelectorAll(".like-button");

    for (const likeButtonElement of likeButtonElements) {
      likeButtonElement.addEventListener("click", (event) => {
        event.stopPropagation();
      
        if (user) {
          const commentID = likeButtonElement.dataset.index;
          onToggleLike(commentID);
        } else {
          alert('Чтобы поставить лайк, авторизуйтесь');
        }
      });
    }
  }
}