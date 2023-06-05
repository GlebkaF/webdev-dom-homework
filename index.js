// ---------- Кучкуем переменные ----------------------------------------------

// let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
let token = null;
let comments = [];
let loadingComments = true;
let isLoadingAdd = false;

// --------- Импортируем функции и переменные ---------------------------------

import { postComments, getComments } from "./api.js";
import { renderLogin, name } from "./components/login-component.js";

// ---------- Рендерим имеющиеся комментарии ----------------------------------

const getWrittenComments = async () => {
  renderApp(loadingComments);
  return getComments({ token })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked,
          isLikeLoading: false,
        };
      });
      comments = appComments;
      loadingComments = false;
      renderApp(loadingComments);
    })
    .catch((error) => {
      alert(error.message);
    });
};

// ---------- Рендеринг формы -------------------------------------------------

const renderForm = (isLoading) => {
  const formWindow = document.querySelector(".add-form");
  const loaderText = document.getElementById("loader");

  if (isLoading) {
    loaderText.classList.remove("hidden");
    formWindow.classList.add("hidden");
  } else {
    loaderText.classList.add("hidden");
    formWindow.classList.remove("hidden");
  }
};

const renderApp = (loadingComments) => {
  const appEl = document.getElementById("app");

  const commentsHTML = comments
    .map((comment, index) => {
      const formattedDate = formatDate(new Date(comment.date));
      return `<li class="comment" data-index='${index}'>
            <div class="comment-header">
              <div>${comment.name}</div>
              <div>${formattedDate}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${comment.text
                  .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
                  .replaceAll("QUOTE_END", "</div>")}
              </div>
            </div>
            <div class="comment-footer">
              <!--<button class="edit-button">Редактировать</button> -->
              <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button data-index='${index}' class="like-button ${
        comment.isLiked ? "-active-like" : ""
      } ${comment.isLikeLoading ? "-loading-like" : ""}"></button>
              </div>
            </div>
          </li>`;
    })
    .join("");

  if (!token) {
    const appHtml = `
                    <ul class="comments">
                            ${
                              loadingComments
                                ? "<p>Пожалуйста подождите, комментарии загружаются...</p>"
                                : ""
                            }
                            ${commentsHTML}
                        </ul>
                        <p class="warning">Чтобы добавить комментарий, <button class="login-button">авторизуйтесь</button></p>
                    `;

    appEl.innerHTML = appHtml;
    document.querySelector(".login-button").addEventListener("click", () => {
      renderLogin({
        appEl,
        setToken: (newToken) => {
          token = newToken;
        },
        getWrittenComments,
      });
    });

    return;
  }

  const appHtml = `
                <ul class="comments">
                        ${
                          loadingComments
                            ? "<p>Пожалуйста подождите, комментарии загружаются...</p>"
                            : ""
                        }
                        ${commentsHTML}
                    </ul>
                    <div class="add-form">
                        <input
                        type="text"
                        class="add-form-name"
                        placeholder="Введите ваше имя"
                        oninput=""
                        />
                        <textarea
                        type="textarea"
                        class="add-form-text"
                        placeholder="Введите ваш коментарий"
                        rows="4"
                        oninput=""
                        ></textarea>
                        <div class="add-form-row">
                        <button class="add-form-button" id="button-add">Написать</button>
                        </div>
                    </div>

                    <div class="loading-comment hidden" id="loader">
                        Комментарий добавляется...
                    </div>
                `;

  appEl.innerHTML = appHtml;

  const buttonComments = document.querySelector(".add-form-button");
  const nameInputElement = document.querySelector(".add-form-name");
  const textInputElement = document.querySelector(".add-form-text");
  buttonComments.disabled = true;

  nameInputElement.value = name;
  nameInputElement.disabled = true;

// ---------- Включение некликабельности кнопки при отсутствии имени ----------

  textInputElement.addEventListener("input", () => {
    buttonComments.disabled = false;
  });

// ---------- Обработчик события добавления комментария -----------------------

  buttonComments.addEventListener("click", () => {
    textInputElement.classList.remove("error");

    isLoadingAdd = true;
    renderForm(isLoadingAdd);

    postComments({
      text: textInputElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      token,
    })
      .then(() => {
        return getWrittenComments();
      })
      .then(() => {
        isLoadingAdd = false;
        renderForm(isLoadingAdd);
        textInputElement.value = "";
      })
      .catch((error) => {
        isLoadingAdd = false;
        renderForm(isLoadingAdd);
        alert(error.message);
      });
  });

// ---------- Встраиваем слушателя событий на ввод текста ---------------------

      buttonComments.disabled = true;
      buttonComments.classList.add('empty');
      textInputElement.addEventListener('input', handleInput);
    function handleInput() {
      if (textInputElement.value.trim() !== '') {
        buttonComments.disabled = false;
        buttonComments.classList.remove('empty');
      } else {
        buttonComments.disabled = true;
        buttonComments.classList.add('empty');
      }
    }
// ---------- Конец слушателя событий -----------------------------------------

  counterLikes(comments);

  answerComments(comments);

};

getWrittenComments();

// ---------- ВСТАВЛЯЕМ РАЗНЫЕ ФИЧИ  -------------------------------------------

// ---------- Ответ на комментрарий --------------------------------------------

const answerComments = (comments) => {
  const oldComments = document.querySelectorAll('.comment');

  const textInputElement = document.querySelector(".add-form-text");

  oldComments.forEach((oldElement) => {
    oldElement.addEventListener("click", () => {
      const index = oldElement.dataset.index;

      textInputElement.value = `QUOTE_BEGIN ${comments[index].text}\n${comments[index].name} QUOTE_END`;
    });
  }); 
};

// --------- Декларируем вспомогательную функцию задержки ---------------------

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

// ---------- Форматируем дату ------------------------------------------------

function formatDate(date) {
  const year = date.getFullYear().toString().slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// ---------- Это счетчик лайков ----------------------------------------------

function counterLikes() {
  const likesButtonElements = document.querySelectorAll('.like-button');

  likesButtonElements.forEach((likesButtonElement) => {
    likesButtonElement.addEventListener('click', (event) => {
      event.stopPropagation();
      const index = likesButtonElement.dataset.index;
      const comment = comments[index];

      comment.isLikeLoading = true; 
      renderApp(); 
      delay(1000).then(() => {
        comment.isLiked = !comment.isLiked;
        likesButtonElement.classList.toggle('-active-like');
        comment.likes = comment.isLiked 
        ? 
        ++comment.likes 
        : 
        --comment.likes;
        comment.isLikeLoading = false;
        renderApp();
      });
    });
  });
}