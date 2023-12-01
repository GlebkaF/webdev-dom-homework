const listElement = document.getElementById("list");
const btn = document.getElementById("btn");
const inputNameElement = document.getElementById("input-name");
const inputComentElement = document.getElementById("input-coment");

const comments = [
  {
    name: "Глеб Фокин",
    data: "12.02.22 12:18",
    comment: "Это будет первый комменетарий на этой странице",
    isLike: 3,
    isLower: false,
  },
  {
    name: "Варвара",
    data: "13.02.22 19:22",
    comment: "Мне нравится как оформлена эта страница! ❤",
    isLike: 75,
    isLower: false,
  },
];

const initLike = () => {
  const likeButton = document.querySelectorAll(".like-button");
  for (const likebuttons of likeButton) {
    const index = likebuttons.dataset.index;
    likebuttons.addEventListener("click", (event) => {
      event.stopPropagation();
      if (comments[index].isLower) {
        comments[index].isLike -= 1;
        comments[index].isLower = false;
      } else {
        comments[index].isLike += 1;
        comments[index].isLower = true;
      }

      renderComments();
    });
  }
};

initLike();
// Для ответа на комментарий создаем функицю initReply (2.11)

function initReply() {
  const commentElement = document.querySelectorAll("#comment");
  for (const commentElements of commentElement) {
    commentElements.addEventListener("click", (event) => {
      event.stopPropagation();
      let index = commentElements.dataset.id;
      inputComentElement.value = `${
        comments[index].comment + comments[index].name
      }`;
    });
  }
}

// Рендер функция
const renderComments = () => {
  const commentsHTML = comments
    .map((item, index) => {
      return ` <li class="comment" id="comment" data-id="${index}">
    <div class="comment-header">
      <div>${item.name}</div>
      <div>${item.data}
      </div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${item.comment}
      </div>    
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${item.isLike}</span>
        <button class="like-button ${
          item.isLower ? "-active-like" : ""
        }"  data-index='${index}'></button>
      </div>
    </div>
  </li>`;
    })
    .join("");
  listElement.innerHTML = commentsHTML;
  initLike();
  initReply();
};
renderComments();

btn.addEventListener("click", () => {
  // валидация имени и комментарий
  inputNameElement.classList.remove("error");
  if (inputNameElement.value === "") {
    inputNameElement.classList.add("error");
  }
  inputComentElement.classList.remove("error");
  if (inputComentElement.value === "") {
    inputComentElement.classList.add("error");
    return;
  }

  if (inputNameElement.value === "" || inputComentElement.value === "") {
    return;
  }
  const currentDate = new Date();
  const time =
    currentDate.toLocaleDateString().slice(0, 6) +
    currentDate.toLocaleDateString().slice(8, 10) +
    " " +
    currentDate.toLocaleTimeString().slice(0, -3);

  comments.push({
    name: inputNameElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    data: time,
    comment: inputComentElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    isLike: 0,
    isLower: false,
  });
  renderComments();
  // Очистка полей ввода
  inputNameElement.value = "";
  inputComentElement.value = "";
});
