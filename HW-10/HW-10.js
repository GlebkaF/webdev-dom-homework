const name_Input_Element = document.getElementById('name-input');
const comment_Input_Element = document.getElementById('comment-input');
const button_Element = document.getElementById('add-button');
const list_Element = document.getElementById('list');
const delete_Button_Element = document.getElementById('delete-button');

// Массив
const commentsArray = [
  {
    name: 'Глеб Фокин',
    date: '12.02.22 12:18',
    comment: 'Это будет первый комментарий на этой странице',
    like: 3,
    userLike: false,
    paint: ''
  },
  {
    name: 'Варвара Н.',
    date: '13.02.22 19:22',
    comment: 'Мне нравится как оформлена эта страница! ❤',
    like: 75,
    userLike: true,
    paint: '-active-like'
  }
];

// Добавление и удаление Лайков
const likes = () => {
  const likeButtons = document.querySelectorAll('.like-button');
  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', () => {
      const index = likeButton.dataset.index;
      if (commentsArray[index].userLike === false ) {
        commentsArray[index].paint = '-active-like';
        commentsArray[index].like += 1;
        commentsArray[index].userLike = true;
      } else {
        commentsArray[index].paint = '';
        commentsArray[index].like -= 1;
        commentsArray[index].userLike = false;
      }
      renderComments();
    });
  };
};

const renderComments = () => {
  const commentsHtml = commentsArray.map((item, index) =>{
    //let activeLike = ''
    // if (commentsArray[index].paint) {
    //   paint = '-active-like'
    // }
    return `
    <li class="comment">
          <div class="comment-header">
            <div>${item.name}</div>
            <div>${item.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${item.comment}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${item.like}</span>
              <button data-index='${index}' class="like-button ${item.paint}"></button>
            </div>
          </div>
        </li>
    `})
    .join('');
    list_Element.innerHTML = commentsHtml;
    likes();
};
renderComments();
// Условие
button_Element.disabled = true;
name_Input_Element.addEventListener('input', () =>{
  if (name_Input_Element.value === " " || comment_Input_Element.value === " ") {
    button_Element.disabled = true;
    return;
  } else {
    button_Element.disabled = false;
  }
})

// Функция клика, валидация
button_Element.addEventListener('click', () => {
    name_Input_Element.classList.remove('error');
    comment_Input_Element.classList.remove('error');
    button_Element.classList.remove("disabled-button");

    // Удаление пробелов спереди и сзади в полях ввода
    name_Input_Element.value = name_Input_Element.value.trim();
    comment_Input_Element.value = comment_Input_Element.value.trim();

    // Проверка на пустые поля
    if (name_Input_Element.value === "" || comment_Input_Element.value === "") {
      name_Input_Element.classList.add('error');
      comment_Input_Element.classList.add('error');
      button_Element.classList.add("disabled-button");
      return;
    }

  // Установка формата даты ДД.ММ.ГГГГ ЧЧ:ММ
  const date = new Date();
  const formattedDate =
  date.getDate().toString().padStart(2, '0') + '.' +
  (date.getMonth() + 1).toString().padStart(2, '0') + '.' +
  date.getFullYear().toString().slice(-2) + ' ' +
  date.getHours().toString().padStart(2, '0') + ':' +
  date.getMinutes().toString().padStart(2, '0');

  commentsArray.push({
      name: name_Input_Element.value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
      date: formattedDate,
      comment: comment_Input_Element.value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
      like: 0,
      userLike: false,
      paint: '',
  });
    renderComments();
    name_Input_Element.value = '';
    comment_Input_Element.value = '';
    button_Element.disabled = true;
});

delete_Button_Element.addEventListener('click', () =>{
  const lastCommentIndex = list_Element.innerHTML.lastIndexOf( '<li class="comment">' );
  if (lastCommentIndex !== -1) {
    list_Element.innerHTML = list_Element.innerHTML.substring( 0, lastCommentIndex );
  }
});

document.addEventListener('keyup', (event) =>{
  if (event.key === 'Enter') {
    button_Element.click();
  }
});
