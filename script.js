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

const nameInputElement = document.querySelector('.add-form-name');
const commentsElement = document.querySelector('.add-form-text');

const buttonElement = document.getElementsByClassName('add-form-button')[0];
//const listElement = document.getElementsByClassName('comments')[0];
const listElement = document.getElementById("list");


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

// обработка нажатия на кнопку like
function initLikeButtonsListeners() {
  const likeButtons = document.querySelectorAll('.like-button');

  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Предотвращает всплытие события
      const index = likeButton.dataset.index;

      console.log("index", index);
      console.log(comments[index].likesElement);

      if (comments[index].likesElement === true) {
        comments[index].likesElement = false;
        comments[index].likesCounter--;
      } else {
        comments[index].likesElement = true;
        comments[index].likesCounter++;
      }
      renderComments();
    })
  }
}

// функция рендерит список комментариев из массива
function renderComments() {
  const commentsHtml = comments.map((comment, index) => {
    const commentTextWithQuotes = comment.commentElement.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>");
    const commentTextSafe = comment.nameElement.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${commentTextSafe}</div>
          <div>${comment.timeElement}</div>
        </div>
        <div class="comment-body">
        <div class="comment-text" style="white-space: pre-line;">${commentTextWithQuotes}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesCounter}</span>
            <button class="like-button${comment.likesElement ? " -active-like" : ""}" data-index="${index}"></button>
          </div>
        </div>
      </li>
    `;
  }).join("");

  listElement.innerHTML = commentsHtml;
  commentsElement.value = '';
  nameInputElement.value = '';
  initLikeButtonsListeners();
  console.log(comments);

  // Добавляем обработчик события клика для каждого элемента комментария
  const commentElements = document.querySelectorAll('.comment');
  for (const commentElement of commentElements) {
    commentElement.addEventListener('click', () => {
      const indexComment = commentElement.dataset.index;
      const { nameElement, commentElement: commentText } = comments[indexComment];

      // Предзаполняем форму добавления комментария
      // commentsElement.value = '"' + nameElement + '" ' + commentText + ': ';
      commentsElement.value = 'QUOTE_BEGIN' + ' (' + nameElement + ') ...' + commentText + '... ' + 'QUOTE_END' + ' ';
    });
  }
}

renderComments();
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

  // запись нового комментария в массив
  const newComment = {
    nameElement: nameInputElement.value,
    commentElement: commentsElement.value.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
    timeElement: datetime,
    likesElement: false,
    likesCounter: 0
  };
  comments.push(newComment);
  renderComments();

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
