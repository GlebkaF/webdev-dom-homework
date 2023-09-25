import {dateString} from "./date.js";
import {getComments} from "./api.js";
import {postComments} from "./api.js";

// Создаём переменные обращаясь к классу
const commentsElement = document.querySelector('.comments');
const nameInputElement = document.querySelector('.add-form-name');
const commentInputElement = document.querySelector('.add-form-text');
const buttonInputElement = document.querySelector('.add-form-button');
const formInputElement = document.querySelector('.add-form');
const loaderListElement = document.querySelector('.loader_list');
const loaderFormElement = document.querySelector('.loader_form');

// Массив с комментариями
let commentsArray = [];

// Запрос в API и рендер
const fetchAdnRenderComments = () => {
  return getComments()
  .then((response) => {
    commentsArray = response.comments
    renderList();
  })
  .catch((error) => {
    alert('Нет соединения с интернетом');
    console.log(error);
  })
};

fetchAdnRenderComments()
.then(() => {
  loaderListElement.classList.add('hide-elem');
});

// Функция лайка
const likeListener = () => {
  const likeElements = document.querySelectorAll('.like-button');
  for (let like of likeElements) {
    like.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = like.dataset.index;
        if (commentsArray[index].isLiked === false) {
          commentsArray[index].isLiked = true;
          commentsArray[index].likes++;
        } else {
          commentsArray[index].isLiked = false;
          commentsArray[index].likes--;
        }
        renderList();
    });
  }
}; 

// Функция ответа на комментарий
const answerComment = () => {
    const commentTextElement = document.querySelectorAll('.comment-text');
    const commentNameElement = document.querySelectorAll('.comment-name');
    for (const comment of commentTextElement) {
      comment.addEventListener("click", () => {
        const index = comment.dataset.index;

        commentInputElement.value = 
        `>${commentTextElement[index].innerHTML} ${commentNameElement[index].innerHTML}`;
      })
    } 
};

// Функция для окрашивания лайка в зависимости от значения activeLike
const activeLike = (comment) => {
    if (comment.isLiked === true) {
      return '-active-like'
    } 
}

// Рендер списка на основе массива 
const renderList = () => {
  const commentsHtml = commentsArray.map((comment, index) => {

    return `<li class="comment">
      <div class="comment-header">
        <div class="comment-name" data-index="${index}">${comment.author.name}</div>
        <div>${dateString(comment.date)}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text" data-index="${index}">
          ${comment.text}
        </div>
        <textarea class="comment-edit-text hide-elem">${commentsArray[index].text}</textarea>
      </div>
      <div class="comment-footer">
        <button class="edit-button" data-index="${index}">Редактировать</button>
        <button class="save-edit-button hide-elem" data-index="${index}">Сохранить</button>
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${activeLike(comment)}" data-index="${index}"></button>
        </div>
      </div>
    </li>`
  }).join('');
  
  commentsElement.innerHTML = commentsHtml; 
  likeListener();
  answerComment();
  editComment();
};

// Enter в поле комментария означает клик на кнопку "Написать"
const enterListener = commentInputElement.addEventListener("keyup", () => {
if (event.keyCode === 13) {
    buttonInputElement.click();
}
});

// Функция кнопки "Написать"
const buttonListener = buttonInputElement.addEventListener("click", () => {
  
  // Проверка на пустые значения
  formInputElement.classList.remove("add-form-error");
  if (nameInputElement.value.trim() === '' || commentInputElement.value.trim() === '') {
    formInputElement.classList.add("add-form-error");
    return;
  };  

  // Убрали форму
  formInputElement.classList.add('hide-elem');
  loaderFormElement.classList.remove('hide-elem');

  // Отправили новый объект на сервер
    postComments(commentInputElement.value, nameInputElement.value)
    .then((response) => {
      // Проверили статус 
      switch (response.status) {
        case 400:
          throw new Error("Имя и комментарий должен содержать хотя бы 3 символа")
          break;
        case 500:
          throw new Error("Сервер сломался, попробуй позже")
          break;
        default:
          return fetchAdnRenderComments();
      }
    })
    // Вернули форму
    .then(() => {
      formInputElement.classList.remove('hide-elem');
      loaderFormElement.classList.add('hide-elem');

      // Очищаем форму от последнего комментария
      nameInputElement.value = '';
      commentInputElement.value = '';
    })
    .catch((error) => {
      formInputElement.classList.remove('hide-elem');
      loaderFormElement.classList.add('hide-elem');
      alert(error);
      console.log(error);
    });
});

// Функция кнопки "Удалить последний комментарий"
document.querySelector('.delete-comment-button').addEventListener("click", () => {
  let lastList = document.querySelector('li:last-child');
  lastList.remove();
});

// Функция кнопки "Редактировать"
const editComment = () => {

  // Находим кнопки "Редактировать", "Сохранить", существующие комменты и поля для ввода новых.
  const editElements = document.querySelectorAll(".edit-button");
  const saveEditElements = document.querySelectorAll(".save-edit-button");
  const commentText = document.querySelectorAll(".comment-text");
  const commentEditText = document.querySelectorAll(".comment-edit-text")

  // На каждую кнопу "Редактировать" вешаем слушатель событий
  for (let edit of editElements) {
    const index = edit.dataset.index;
    edit.addEventListener("click", () => {

      // Меняем видимость кнопок и полей местами 
      commentText[index].classList.add('hide-elem');
      commentEditText[index].classList.remove('hide-elem');
      editElements[index].classList.add('hide-elem');
      saveEditElements[index].classList.remove('hide-elem');

        // На открытую кнопу "Сохранить" вешаем слушатель событий
        saveEditElements[index].addEventListener("click", (event) => {

          // Запрещаем всплытие
          event.stopPropagation();

          // Меняем значение comment на новое значение
          commentsArray[index].comment = commentEditText[index].value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;");

          // Меняем видимость кнопок и полей обратно
          commentText[index].classList.remove('hide-elem');
          commentEditText[index].classList.add('hide-elem');
          editElements[index].classList.remove('hide-elem');
          saveEditElements[index].classList.add('hide-elem');

          renderList();
        });
    });
  };
};

renderList();
console.log("It works!");