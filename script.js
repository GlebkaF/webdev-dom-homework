"use strict";
console.log("It works!");
const buttonElement = document.getElementById("add-button");
const commentElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");

const comments = [
{
  name: "Глеб Фокин",
  data: "12.02.22 12:18",
  comment: "Это будет первый комментарий на этой странице",
  likes: false,
  numberLikes: 3
},
{
  name: "Варвара Н.",
  data: "13.02.22 19:22",
  comment: "Мне нравится как оформлена эта страница! ❤ ",
  likes: true,
  numberLikes: 75
}
]

buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove("error")
  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    return;
  };

  textInputElement.classList.remove("error")
  if (textInputElement.value === "") {
    textInputElement.classList.add("error");
    return;
  };

  function formatDate(myDate) {
    let date = myDate.getDate();
    let month = myDate.getMonth() + 1;
    let hour = myDate.getHours();
    let minute = myDate.getMinutes();

    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + (month + 1);
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    return `${date}.${month}.${myDate.getFullYear().toString().substr(-2)} ${hour}:${minute}`;
  }
   comments.push({
    name: nameInputElement.value,
    data: formatDate(new Date()),
    comment: textInputElement.value.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
    likes: false,
    numberLikes: 0
   })


  renderComments(); 

});

const initLikeButtonListeners = () => {
  for (const likeButton of document.querySelectorAll(".like-button")) {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = likeButton.dataset.index;
      const comment = comments[index];
      if (comment.likes) {
        comment.likes = false;
        comment.numberLikes--;
      } else {
        comment.likes = true;
        comment.numberLikes++;
      };
      renderComments();
    });
  };
};

const renderComments = () => {
  const commentsHtml = comments.map((comment, index) => {
    const commentTextQuotes = comment.comment.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>");
    const commentNameSafe = comment.name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `
    <li class="comment" data-index=${index}>
      <div class="comment-header">
          <div>${commentNameSafe}</div>
          <div>${comment.data}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text" >${commentTextQuotes}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter" data-index=${index}>${comment.numberLikes}</span>
            <button class="like-button${comment.likes ? " -active-like" : ""}" data-index=${index}></button>
          </div>
        </div>
      </li>`
  }).join("");

  commentElement.innerHTML = commentsHtml;
  nameInputElement.value = "";
   textInputElement.value = "";
  initLikeButtonListeners();

  const commentElements = document.querySelectorAll('.comment');
  for (const commentElement of commentElements) {
    const index = commentElement.dataset.index;
    commentElement.addEventListener('click', () => {
      const {name, comment} = comments[index];
      textInputElement.value = 'QUOTE_BEGIN' + ' (' + name + ') ...' + comment + '... ' + 'QUOTE_END' + ' ';
        });
  };

}

renderComments();
