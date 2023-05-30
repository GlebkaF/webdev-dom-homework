const comments = document.querySelectorAll('.comment');
const commentList = document.querySelector('.comments');
const addForm = document.querySelector('.add-form');
const userName = document.querySelector('.add-form-name');
const textComment = document.querySelector('.add-form-text');
const button = document.querySelector('.add-form-button');
const commentsListArray = [
  {
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    msg: "Это будет первый комментарий на этой странице",
    like: "3",
    Iliked: false,
  },
  {
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    msg: "Мне нравится как оформлена эта страница! ❤",
    like: "75",
    Iliked: false,
  },
  {
    name: "Андрей",
    date: "01.05.23 13:01",
    msg: "Что то написал в этом коменте",
    like: "1",
    Iliked: true,
  }
];
const addLikes = (e) => {
  const comment = commentsListArray[e.target.dataset.id];
  comment.like++;
  comment.Iliked = true;
}
const delLikes = (e) => {
  const comment = commentsListArray[e.target.dataset.id];
  comment.like--;
  comment.Iliked = false;
}
const initLikeClick = () => {
  const likeClickElements = document.querySelectorAll('.likes');
  for (const likeClickElement of likeClickElements) {
    likeClickElement.addEventListener('click', (e) => {
      e.stopPropagation();
      (commentsListArray[e.target.dataset.id].Iliked) ? delLikes(e) : addLikes(e);
      renderComments();
    });
  }
}
function renderComments() {
  const commentHtmlResult = commentsListArray.map((comment, id) => {
    (comment.Iliked) ? Iliked = '-active-like' : Iliked = '';
    (comment.date) ? dates = comment.date : dates = `${("0" + date.getDate()).slice(-2)}.${("0" + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear().toString().slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`
    return `<li class="comment" data-id="${id}">
<div class="comment-header">
<div class="comment-name">${comment.name}</div>
<div>${dates}</div>
</div>
<div class="comment-body"> <div class="comment-text">${comment.msg}</div>
</div>
<div class="comment-footer">
<div class="likes">
<span class="likes-counter">${comment.like}</span>
<button class="like-button ${Iliked}" data-id="${id}"></button>
</div>
</div>
</li>`;
  }).join("");
  commentList.innerHTML = commentHtmlResult;
  initLikeClick();
  addCommentListener()
}
const validate = () => {
  userName.classList.toggle('error', userName.value.length === 0);
  textComment.classList.toggle('error', textComment.value.length === 0);
  return (userName.value.length >= 1 && textComment.value.length >= 1);
}
const addComment = () => {
  const date = new Date();
  if (validate()) {
    commentsListArray.push({
      //Убираем уязвимость, запрещаем вводить теги в поле ввода имени
      name: userName.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      date: `${("0" + date.getDate()).slice(-2)}.${("0" + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear().toString().slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`,
      //Убираем уязвимость, запрещаем вводить теги в поле ввода текста
      msg: textComment.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      like: 0,
    });
    renderComments();
    textComment.value = "";
    userName.value = "";
    button.setAttribute('disabled', '');
  }
};
button.addEventListener('click', (event) => {
  addComment();
});
addForm.addEventListener('input', (event) => {
  if (validate) {
    button.removeAttribute('disabled');
    button.classList.remove('add-form-button-disabled');
  }
});
addForm.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === "Enter") {
    event.preventDefault();
    addComment();
  }
});
renderComments();
// Функция добавляет ответ на комментарий
function addCommentListener() {
  comments.forEach((comment) => {
    comment.addEventListener('click', () => {
      const answer = comment.querySelector('.comment-body').textContent;
      const nameUser = comment.querySelector('.comment-name').textContent;
      textComment.value = `>${answer}${nameUser}.,`;
    });
  });
}
addCommentListener();