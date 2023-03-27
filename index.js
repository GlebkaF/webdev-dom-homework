// + Работает целевой сценарий, у каждого комментария в списке работает кнопка лайка.
// + Данные о комментариях хранятся в массиве JS-кода.
// + В коде реализована рендер-функция, которая рендерит список комментариев.

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");

const initEventListeners = () => {
  const commentElements = document.querySelectorAll('.comment');

  for(const commentElement of commentElements) {
    commentElement.addEventListener("click", () => {
      likes();
    })
  }

}

function myDate() {
  let date = new Date();
  let monthArray = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  let myMin = String(date.getMinutes()).lenght < 2 ? '0' + date.getMinutes() : date.getMinutes();
  let myHours = String(date.getHours()).lenght < 2 ? '0' + date.getHours() : date.getHours();
  let myDay = String(date.getDate()).lenght < 2 ? '0' + date.getDate() : date.getDate();
  let myMonth = monthArray[+date.getMonth()];
  let myYear = String(date.getFullYear()).slice(2);
  let str = myDay + '.' + myMonth + '.' + myYear + ' ' + myHours + ':' + myMin;
  return str
}

const comment = [
  {
    name: "Глеб Фокин",
    time: "12.02.22 12:18",
    comments: "Это будет первый комментарий на этой странице",
    like: "0",
  },
  {
    name: "Варвара Н.",
    time: "13.02.22 19:22",
    comments: "Мне нравится как оформлена эта страница! ❤",
    like: "0",
  },
]

function likes() {
  const listItems = listElement.querySelectorAll('.comment');
    for (let key of listItems) {
      const likeButton = key.querySelector('.like-button');
      const likeCounter = key.querySelector('.like-counter');

      likeButton.addEventListener("click",() => {
        likeButton.classList.toggle('-active-like');
        likeButton.classList.contains('-active-like');
      })
    }
}

const renderComment = () => {
  const commentHtml = comment.map((comment) => {
    return `<li class="comment" data-like = '0'>
    <div class="comment-header">
      <div>${comment.name}</div>
      <div>${comment.time}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${comment.comments}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">0</span>
        <button class="like-button"></button>
      </div>
    </div>
  </li>`
  }) .join("");
  console.log(commentHtml)

  listElement.innerHTML = commentHtml;

  initEventListeners();
}

renderComment();

buttonElement.addEventListener('click', () => {
nameInputElement.classList.remove("error");
commentInputElement.classList.remove("error");
  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    return;
  };
  if (commentInputElement.value === "") {
    commentInputElement.classList.add("error");
    return;
  }

  comment.push({
    name: nameInputElement.value,
    time: myDate(),
    comments: commentInputElement.value,
    like: "0",
  });

  renderComment();

  nameInputElement.value = "";
  commentInputElement.value = ""; 
});