import { name, postComment } from "./api.js";

export const renderComments = ({ comments, fetchPromiseFunctionGet }) => {
  const appElement = document.querySelector(".app");
  if (comments.length === 0) {
    return (lastComments.textContent =
      "Подождите, пожалуйста, комментарии загружаются...");
  }
  const commentsHtml = comments
    .map((comment, index) => {
      return `<li id="comment-item" class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body" >
        <div class="comment-text">
          ${comment.text} 
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes" >
          <span class="likes-counter" data-count="${comment.likes}">${comment.likes}</span>
          <button class="like-button" data-active-like="${comment.isLiked}"></button>
        </div>
      </div>
      </li>`;
    })
    .join("");

  const appHtml = `<ul id="list" class="comments">${commentsHtml}</ul>
  <div class="add-form">
    <input type="text" class="add-form-name" placeholder="${name}" id="name-input" readonly/>
    <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
      id="comment-textarea"></textarea>
    <div class="add-form-row">
      <button id="add-button" class="add-form-button">Написать</button>
    </div>
  </div>
  <div class="add-form-delete">
    <button id="delete-comment" class="add-form-button">
      Удалить последний комментарий
    </button>
  </div>`;

  appElement.innerHTML = appHtml;

  // console.log(login(loginInputElement));

  const buttonElement = document.getElementById("add-button"), // Находит первый элемент Button "Написать комментарий"
    nameInput = document.getElementById("name-input"), // Находит первый элемент Input для ввода имени
    commentTextarea = document.getElementById("comment-textarea"), // Находит первый элемент Textarea для ввода комментария
    deleteComment = document.getElementById("delete-comment"), // Находит первый элемент Button "удалить последний комментарий"
    lastComments = document.querySelector(".comments"), // Находит все элементы Контейнер с одним комментарием
    addForm = document.querySelector(".add-form"), // Находит поле для заполнение комментариев
    addFormDelete = document.querySelector(".add-form-delete"), // Родитель элемент кнопки элемента удалить
    container = document.querySelector(".container"); // Родитель всех элементов (кнопки, input, textarea, комментариев)

  nameInput.classList.add("gray-name-field");

  // Функция для обработчика клика кнопки "Написать"
  const handlePostClick = () => {
    
    // Удаление валидации input и textarea от красного поля
    commentTextarea.classList.remove("error-input");

    // Добавление валидации красного поля input и textarea если поле не заполнено текстом
    if (commentTextarea.value === "") {
      commentTextarea.classList.add("error-input");
      return;
    }

    addForm.classList.add("hidden"); // Добавил стиль и через него скрываю элемент "форма для комментариев"

    let elem = document.createElement("p"); // В переменной созданный элемент
    elem.textContent = "Подождите, пожалуйста, комментарий добавляется......."; // Текст в созданном элементе
    lastComments.appendChild(elem);

    // Отправляем на сервер данные которые вводят в nameInput и textarea

    postComment({
      // import функции "POST" запроса из api.js
      text: commentTextarea.value, // Вызов функции оповещения клиента о пустом или минимальном вводе символов в поле для комментария
      name: nameInput.value, // Вызов функции оповещения клиента о пустом или минимальном вводе символов в поле для имени
      forceError: true,
    })
      .then((response) => {
        if (response.status === 201) {
          // Обработка статуса 201
          return response.json();
        } else if (response.status === 400) {
          // Обработка статуса 400
          throw new Error("Ошибка в запросе");
        } else if (response.status === 500) {
          // Обработка статуса 500
          throw new Error("Сервер сломался");
        }
      })
      .then(() => {
        // Вызов функции запроса GET (функционал описан выше)
        return fetchPromiseFunctionGet();
      })
      .then(() => {
        return elem.parentNode.removeChild(elem); // В родительском элементе удаляю children (elemText) - созданный элемент
      })
      .then(() => {
        nameInput.value = ""; // Обнуляю поля для имени, если статус 201
        commentTextarea.value = ""; // обнуляю поле для текста коммента, если статус 201
        return addForm.classList.remove("hidden"); // Удаляем стиль, который скрывает элемент "форма для комментариев"
      })
      .catch((error) => {
        // Ловлю возможные ошибки
        if (error.message === "Ошибка в запросе") {
          alert("Необходимо ввести минимум 3 символа");
          elem.parentNode.removeChild(elem);
          addForm.classList.remove("hidden");
          return;
        } else if (error.message === "Сервер сломался") {
          elem.parentNode.removeChild(elem);
          addForm.classList.remove("hidden");
          return handlePostClick();
        } else {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
          elem.parentNode.removeChild(elem);
          addForm.classList.remove("hidden");
        }
      });
    // renderComments({ comments, fetchPromiseFunctionGet });
  };

  // Обработчик события клика - добавляется новый комментарий с выполнением разных условий (условия в функции "handlePostClick")
  buttonElement.addEventListener("click", handlePostClick);

  initAddLikesListener({ delay }); // Вызов функции изменение цвет кнопки "лайка" и + / - "1 лайк"
  initAddUserComments({ comments }); //  Вызов функции по клику на комментарий можно добавить к нему свои комментарии
};

// Функция для имитации запросов в API
function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

// Изменить цвет кнопки "лайка" и + / - "1 лайк"
function initAddLikesListener() {
  const likesButtons = document.querySelectorAll(".like-button"); // Находим все сердечик (лайки)

  for (const likesButton of likesButtons) {
    // Перебираем все сердечки

    likesButton.addEventListener("click", (event) => {
      // На каждое сердечик вешеаем клик
      event.stopPropagation();
      const likesCounterElement = likesButton.previousElementSibling; // Находим предыдущий элемент родителя
      const likesCounter = parseInt(likesCounterElement.textContent); // Считываем содержимое элемента и превращаем в число и храним в переменной

      if (likesButton.dataset.activeLike === "false") {
        // Если дата-атрибут SVG (находится в style.css) равно ложь (начальное положение всегда ложь), то
        delay() // Вызываю функцию с promise имитации запросов в API
          .then(() => {
            // подписываюсь на promise
            likesButton.classList.add("-loading-like"); // Добавляю анимацию на SVG (класс)
            return delay(3000); // Возращаю promise имитации запросов в API (запрос идет 3 секунды)
          })
          .then(() => {
            // подписываюсь на пердыдущий promise
            likesButton.classList.remove("-loading-like"); // Удаляю анимацию с SVG (класс)
            return delay(0); // Возращаю promise имитации запросов в API (запрос идет 0 секунд)
          })
          .then(() => {
            // подписываюсь на пердыдущий promise
            likesCounterElement.textContent = likesCounter + 1; // Добавляю к тексту + 1 (лайк)
            return delay(0); // Возращаю promise имитации запросов в API (запрос идет 0 секунд)
          })
          .then(() => {
            // подписываюсь на пердыдущий promise
            likesButton.dataset.activeLike = "true"; // Меняю дата-атрибут SVG (находится в style.css) на истину и меняю стиль на закрашенное сердечко SVG
            return delay(0); // Возращаю promise имитации запросов в API (запрос идет 0 секунд)
          });
      } else {
        // Если дата-атрибут SVG (находится в style.css) равно истина, то
        delay() // Вызываю функцию с promise имитации запросов в API
          .then(() => {
            // подписываюсь на promise
            likesButton.classList.add("-loading-like"); // Добавляю анимацию на SVG (класс)
            return delay(3000); // Возращаю promise имитации запросов в API (запрос идет 3 секунды)
          })
          .then(() => {
            // подписываюсь на promise
            likesButton.classList.remove("-loading-like"); // Удаляю анимацию с SVG (класс)
            return delay(0); // Возращаю promise имитации запросов в API (запрос идет 0 секунд)
          })
          .then(() => {
            // подписываюсь на promise
            likesCounterElement.textContent = likesCounter - 1; // Удаляю из текста - 1 (лайк)
            return delay(0); // Возращаю promise имитации запросов в API (запрос идет 0 секунд)
          })
          .then(() => {
            // подписываюсь на promise
            likesButton.dataset.activeLike = "false"; // Меняю дата-атрибут SVG (находится в style.css) на ложь и меняю стиль на не закрашенное сердечко SVG
            return delay(0); // Возращаю promise имитации запросов в API (запрос идет 0 секунд)
          });
      }
    });
  }
}

// По клику на комментарий можно добавить к нему свои комментарии
function initAddUserComments({ comments }) {
  const commentTextarea = document.getElementById("comment-textarea");
  const commentTexts = document.querySelectorAll(".comment");
  for (const commentText of commentTexts) {
    commentText.addEventListener("click", () => {
      let index = commentText.dataset.index;
      commentTextarea.value = ` > ${comments[index].text} 
      ${comments[index].name}, `;
    });
  }
}
