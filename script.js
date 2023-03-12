const buttonElement = document.getElementById("add-button");
const nameElement = document.getElementById("name-input");
const commentsElement = document.getElementById("comments-input");
const listElement = document.getElementById("list");
const commentListElement = document.getElementById("comment-list");

const comments = [
  {
    name: 'Глеб Фокин',
    date: '12.02.22 12:18',
    text: 'Это будет первый комментарий на этой странице',
    likeCount: 3,
    liked: false,
  },
  {
    name: 'Варвара Н.',
    date: '13.02.22 19:22',
    text: 'Мне нравится как оформлена эта страница! ❤',
    likeCount: 75,
    liked: true,
  }
]; const options = {
  year: '2-digit',
  month: 'numeric',
  day: 'numeric',
  timezone: 'UTC',
  hour: 'numeric',
  minute: '2-digit'
};
let myDate = new Date().toLocaleDateString("ru-RU", options).replace(',', ' ');

const ButtonTouch = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", () => {
      const index = likeButton.dataset.index;
      if (comments[index].liked === false) {
        comments[index].liked = true;
        comments[index].likeCount += 1;

      } else {
        comments[index].liked = false;
        comments[index].likeCount -= 1;
      }
      renderComments();
    })
  };
}

const renderComments = () => {
  const commentsHtml = comments.map((comment, index) => {
    return `<li class="comment" id = "comment-list" data-index="${index}">
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
        <span class="likes-counter">${comment.likeCount}</span>
        <button data-index="${index}" class="${comment.liked ? 'like-button -active-like' : 'like-button'}"></button>
      </div>
    </div>
  </li>`
  })
    .join('');
  listElement.innerHTML = commentsHtml;
  ButtonTouch();
};
renderComments();

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
    likeCount: 0,
    liked: false
  });
  renderComments();
  nameElement.value = '';
  commentsElement.value = '';
});






