"use strict";

// Создаём переменные обращаясь к классу
const commentsElement = document.querySelector('.comments');
const nameInputElement = document.querySelector('.add-form-name');
const commentInputElement = document.querySelector('.add-form-text');
const buttonInputElement = document.querySelector('.add-form-button');
const formInputElement = document.querySelector('.add-form');


// Массив объектов с комментариями
const commentsArray = [
  {
    name: "Глеб Фокин",
    comment: "Это будет первый комментарий на этой странице",
    likes: 3,
    date: '12.02.22 12:18',
    activeLike: false,
  }, 
  {
    name: "Варвара Н.",
    comment: "Мне нравится как оформлена эта страница! ❤",
    likes: 75,
    date: '13.02.22 19:22',
    activeLike: false,
  }, 
]
  
// Функция лайка
const likeListener = () => {
  const likeElements = document.querySelectorAll('.like-button');
  for (let like of likeElements) {
    like.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = like.dataset.index;
        if (commentsArray[index].activeLike === false) {
          commentsArray[index].activeLike = true;
          commentsArray[index].likes++;
        } else {
          commentsArray[index].activeLike = false;
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
    if (comment.activeLike === true) {
      return '-active-like'
    } 
}

// Рендер списка на основе массива 
const renderList = () => {
  const commentsHtml = commentsArray.map((comment, index) => {

    return `<li class="comment">
      <div class="comment-header">
        <div class="comment-name" data-index="${index}">${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text" data-index="${index}">
          ${comment.comment}
        </div>
        <textarea class="comment-edit-text hide-elem">${commentsArray[index].comment}</textarea>
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


  // Получили дату и привели в нужный формат
  let dateString = () => {
    let date = new Date();
    let dateDay = (date) => {
      if (date.getDate().toString().length === 1) {
        return "0" + date.getDate();
      } else {
        return date.getDate();
      }
    };
    let dateMonth = (date) => {
      if (date.getMonth().toString().length === 1) {
        return '0' + (date.getMonth()+1)
      } else {
        return date.getMonth()+1;
      }
    };
    let dateHour = (date) => {
      if (date.getHours().toString().length === 1) {
        return `0${date.getHours()}`
      } else {
        return date.getHours();
      }
    };
    let dateMinute = (date) => {
      if (date.getMinutes().toString().length === 1) {
        return `0${date.getMinutes()}`
      } else {
        return date.getMinutes();
      }
    };

    return `${dateDay(date)}.${dateMonth(date)}.${date.getFullYear() - 2000} ${dateHour(date)}:${dateMinute(date)}`
  }

  // Добавили новый объект в массив
  commentsArray.push({
    name: nameInputElement.value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;"),
    comment: commentInputElement.value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;"),
    likes: 0,
    date: dateString(),
    activeLike: false,
  })

  // Очищаем форму от последнего комментария
  nameInputElement.value = '';
  commentInputElement.value = '';

  // Рендерим новый список
  renderList();
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