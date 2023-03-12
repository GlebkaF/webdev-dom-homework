const buttonElement = document.getElementById("add-button");
const nameElement = document.getElementById("name-input");
const commentsElement = document.getElementById("comments-input");
const listElement = document.getElementById("list");
const commentListElement = document.getElementById("comment-list");
const likeButtons = document.querySelectorAll(".like-button");
const like = 0;
let count;
const options = {
  year: '2-digit',
  month: 'numeric',
  day: 'numeric',
  timezone: 'UTC',
  hour: 'numeric',
  minute: '2-digit'
};

const comments = [
  {
    name: 'Глеб Фокин',
    date: '12.02.22 12:18',
    text: 'Это будет первый комментарий на этой странице',
    like: '3',
  },
  {
    name: 'Варвара Н.',
    date: '13.02.22 19:22',
    text: 'Мне нравится как оформлена эта страница! ❤',
    like: '75',
  }
];
const ButtonTouch = () => {
  for (const likeButton of likeButtons) {
likeButton.addEventListener("click", ()=> {
  console.log(1);
})
};
}
ButtonTouch();



const renderComments = () => {
  const commentsHtml = comments.map((comment) => {
    return `<li class="comment" id = "comment-list">
    <div class="comment-header">
      <div>${comment.name}</div>
      <div>${comment.date} </div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${comment.text} 
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${comment.like}</span>
        <button class="like-button"></button>
      </div>
    </div>
  </li>`
  })
    .join('');
  listElement.innerHTML = commentsHtml;
  
};
renderComments();

let myDate = new Date().toLocaleDateString("ru-RU", options).replace(',', ' ');

buttonElement.addEventListener("click", () => {
  nameElement.classList.remove("error");
  commentsElement.classList.remove("error");

  if (nameElement.value === '') {
    nameElement.classList.add("error");
    return

  } else if (commentsElement.value === '') {
    commentsElement.classList.add("error");
    return;
  }
  comments.push({
    name: nameElement.value,
    date: `${myDate}`,
    text: commentsElement.value,
    like: `${like}`
  });
  renderComments();
  
 
  nameElement.value = '';
  commentsElement.value = '';
});








