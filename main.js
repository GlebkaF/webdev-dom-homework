const btn = document.querySelector(".add-form-button");
const ul = document.querySelector(".comments");
const nameUser = document.querySelector(".add-form-name");
const commentUser = document.querySelector(".add-form-text");
const form = document.querySelector(".add-form");
const del = document.querySelector(".remove-form-button");

//! Работа с временем
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear() - 2000;
let hour = date.getHours();
let minute = date.getMinutes();
if (month < 10) {
  month = "0" + month;
}
if (hour < 10) {
  hour = "0" + hour;
}
if (minute < 10) {
  minute = "0" + minute;
}
date = day + "." + month + "." + year + "  " + hour + ":" + minute;

//! Массив с комментариями
const userComments = document.querySelector('.comments');
const userComment = [
  {  name: 'Глеб Фокин',
    date: '12.02.22 12:18',
    comment: 'Это будет первый комментарий на этой странице',
    likes: 3,
    isLike: false,
    isEdit: false,
  },
  {  name: 'Варвара Н.',
    date: '13.02.22 19:22',
    comment: 'Мне нравится как оформлена эта страница! ❤',
    likes: 75,
    isLike: true,
    isEdit: false,
  },
];

//! Обходим массив лайков до и после добавления комментариев
const initLikesBtn = () => {
  const likeBtns = document.querySelectorAll('.like-button');
  for (const likeBtn of likeBtns) {
    likeBtn.addEventListener('click', () => {
      for (const comment of userComment) {
        const index = likeBtn.dataset.index;
        console.log(index);
        console.log(comment.likes);
        if (comment.isLike === true) {
          comment.likes = comment.likes += 1;
        }
        
        if (comment.isLike === false) {
          comment.likes = comment.likes -= 1;
        }
      }
      renderUserComments();
    });
  }
}
initLikesBtn();

function addComment() {
  //! создание нового комментария
  userComment.push({
    name: nameUser.value,
    date: date,
    comment: commentUser.value,
    likes: 0,
    isLike: false,
    isEdit: false,
  });
  //! Добавляем чтение клика по лайку
  initLikesBtn();
  //! Чистка текстовых полей формы после отправки
  nameUser.value = "";
  commentUser.value = "";
  //! Добавляем чтение комментариев после добавления комментария
  renderUserComments();
  //! Делаем отправку некликабельной, если у нас не заполнены поля
  checkFields();
}

//! Срабатывание добавления комментария при нажатии на кнопку 'Написать'
btn.addEventListener("click", () => {
  addComment();
});

//! Срабатывание добавления комментария при нажатии на кнопку Enter
form.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    addComment();
  }
});

//! Удаление последнего коммента
del.addEventListener("click", () => {
  ul.lastElementChild.remove();
});

//! Делаем отправку некликабельной, если у нас не заполнены поля
function checkFields() {
  if (nameUser.value && commentUser.value) {
    btn.disabled = false;
    btn.classList.remove('btn-gray');
  } else {
    btn.disabled = true;
    btn.classList.add('btn-gray');
  }
}
checkFields();

nameUser.addEventListener('input', checkFields);
commentUser.addEventListener('input', checkFields);


//! Рендерим массив
const renderUserComments = () => {
  console.log('рендер работает');
  userComments.innerHTML = userComment.map((comments, index) => {
    return `
    <li class="comment">
    <div class="comment-header">
      <div>${comments.name}</div>
      <div>${comments.date}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
         ${comments.comment}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${comments.likes}</span>
        <button class="like-button" data-index=${index} data-like=${comments.isLike}></button>
      </div>
    </div>
  </li>`
  }).join('');

  //! Добавляем рендер лайка после добавления комментария
  initLikesBtn();
};
renderUserComments();



