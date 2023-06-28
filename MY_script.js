// формирование даты для внедрения в форму
function dateTime() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const datetime = `${day}.${month}.${year} ${hours}:${minutes}`;
  //console.log(datetime);
  return datetime;
}

// формирование констант из первых элементов коллекции (по индексу)
// *getElementsByClassName() возвращает коллекцию элементов
const nameInputElement = document.querySelector('.add-form-name');
const commentsElement = document.querySelector('.add-form-text');

const buttonElement = document.getElementsByClassName('add-form-button')[0];
//const listElement = document.getElementsByClassName('comments')[0];
const listElement = document.getElementById("list");

// обработка нажатия на кнопку like
// В этом коде мы используем метод closest для нахождения ближайшего
// элемента с классом comment от кнопки likeButton
// Затем мы находим индекс этого элемента в родительском элементе,
// используя метод indexOf
// После этого мы можем обновить соответствующие поля объекта комментария
// из массива comments
const initLikeButtonsListeners = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", () => {
      const likesCounterElement = likeButton.previousElementSibling;
      const likesCounter = parseInt(likesCounterElement.textContent);
      const commentElement = likeButton.closest(".comment");
      const commentIndex = Array.from(commentElement.parentNode.children).indexOf(commentElement);
      const comment = comments[commentIndex];
      if (likeButton.classList.contains("-active-like")) {
        likeButton.classList.remove("-active-like");
        likesCounterElement.textContent = likesCounter - 1;
        comment.likesElement = false;
        comment.likesCounter = likesCounter - 1;
      } else {
        likeButton.classList.add("-active-like");
        likesCounterElement.textContent = likesCounter + 1;
        comment.likesElement = true;
        comment.likesCounter = likesCounter + 1;
      }
    });
  }
};


// массив с первоначальными комментариями
const comments = [
  {
    nameElement: "Глеб, Фокин",
    commentElement: "Это будет первый комментарий на этой странице",
    timeElement: "12.02.22 12:18",
    likesElement: false,
    likesCounter: 3
  },
  {
    nameElement: "Варвара Н.",
    commentElement: "Мне нравится как оформлена эта страница! ❤",
    timeElement: "13.02.22 19:22",
    likesElement: true,
    likesCounter: 75
  }
];

// функция рендерит список комментариев из массива

function renderComments() {
  const commentsHtml = comments.map(comment => {
    return `<li class="comment">
        <div class="comment-header">
          <div>${comment.nameElement}</div>
          <div>${comment.timeElement}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${comment.commentElement}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesCounter}</span>
            <button class="like-button${comment.likesElement ? " -active-like" : ""}"></button>
          </div>
        </div>
      </li>
    `;
  }).join("");

  return (commentsHtml);
};
//commentElements.innerHTML = renderComments();
listElement.innerHTML = renderComments();

// функция для добавления комментария
function addComment() {
  nameInputElement.classList.remove('error');
  commentsElement.classList.remove('error');
  buttonElement.classList.remove('disabled');
  if (nameInputElement.value === '' || commentsElement.value === '') {
    nameInputElement.classList.add('error');
    commentsElement.classList.add('error');
    buttonElement.classList.add('disabled');
    alert('не заполнено одно из обязательных полей!');
    return;
  }
  const datetime = dateTime();

  // создание и добавление нового комментария в список
  // const oldListHtml = listElement.innerHTML;
  // listElement.innerHTML =
  //   oldListHtml +
  //   `<li class="comment">
  //       <div class="comment-header">
  //         <div>${nameInputElement.value}</div>
  //         <div>${datetime}</div>
  //       </div>
  //       <div class="comment-body">
  //         <div class="comment-text">
  //           ${commentsElement.value}
  //         </div>
  //       </div>
  //       <div class="comment-footer">
  //         <div class="likes">
  //           <span class="likes-counter">0</span>
  //           <button class="like-button"></button>
  //         </div>
  //       </div>
  //     </li>`;

  // запись нового комментария в массив
  const newComment = {
    nameElement: nameInputElement.value,
    commentElement: commentsElement.value,
    timeElement: datetime,
    likesElement: false,
    likesCounter: 0
  };
  comments.push(newComment);
  listElement.innerHTML = renderComments();

  // очистка полей ввода
  commentsElement.value = '';
  nameInputElement.value = '';
  initLikeButtonsListeners();
  console.log(comments);
}



// обработка нажатия на кнопку "Добавить"
buttonElement.addEventListener('click', addComment);

// отслеживание нажатия ENTER в поле ввода комментария
// Чтобы предотвратить стандартное поведение браузера
// (добавление символа переноса строки при нажатии Enter в поле ввода),
// мы вызываем метод preventDefault() на объекте event
commentsElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addComment();
  }
});

// console.log(comments);

// обработка нажатия на кнопку "Удалить последний комментарий"
// deleteButtonElement.addEventListener('click', () => {
//   const lastCommentIndex = listElement.innerHTML.lastIndexOf('<li class="comment">');
//   if (lastCommentIndex >= 0) {
//     listElement.innerHTML = listElement.innerHTML.substring(0, lastCommentIndex);
//   }
// });

// добавление кнопки "Удалить последний комментарий" на страницу в HTML