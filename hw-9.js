"use strict";

const writeButtonEl = document.getElementById("write-button");
const nameInputEl = document.getElementById("name-input");
const commentTextEl = document.getElementById("comment-text");
const listEl = document.getElementById("comment-list");
let currentDate = new Date();
const deleteButtonEl = document.getElementById("delete-button");

let users = [];
//Получить список комментариев

const getFetchPromise = () => {
    const fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/NastyaTsyf/comments", {
  method: "GET"
  });

  fetchPromise.then((response) => {
    response.json().then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: comment.isLiked,
        }
      })
      users = appComments;
      console.log(users);
      renderUsers();
      initLikeButton();
      replyТoСomment();
    });
  });
}

getFetchPromise();



const renderUsers = () =>{
  const usersHtml = users.map((user, index) =>{
    return  `<li class="comment" data-comment="${user.text}" data-name="${user.name}">
    <div class="comment-header">
      <div>${user.name}</div>
      <div>${getCommentDate(new Date(user.date))}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${user.text}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${user.likes}</span>
        <button class="like-button ${user.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
      </div>
    </div>
    </li>`
  }).join('');
  listEl.innerHTML = usersHtml;
};

renderUsers();


//date of comment
const getCommentDate = () => {
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = String(currentDate.getFullYear()).split('').slice(2).join('');
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes()

  if (day < 10) { 
    day = "0" + day; 
  }
  if (month < 10) { 
    month = "0" + month; 
  }
  if (hour < 10) { 
    hour = "0" + hour;
  };
  if (minute < 10) { 
    minute = "0" + minute; 
  }
  let commentDate = day + '.' + month + '.' + year + ' ' + hour + ':' + minute;
  return commentDate;
}



document.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        WriteButtonEl.click();
    }
});

writeButtonEl.setAttribute("disabled", true);
writeButtonEl.classList.add("error-btn");

nameInputEl.addEventListener("input", () => {
    if ((nameInputEl.value.length > 0) && (commentTextEl.value.length > 0)) {
        writeButtonEl.removeAttribute("disabled");
        writeButtonEl.classList.remove("error-btn");
    }
});

commentTextEl.addEventListener("input", () => {
    if ((nameInputEl.value.length > 0) && (commentTextEl.value.length > 0)) {
        writeButtonEl.removeAttribute("disabled");
        writeButtonEl.classList.remove("error-btn");
        return;
    }
});

writeButtonEl.addEventListener("click", () => {
    nameInputEl.classList.remove("error");
    commentTextEl.classList.remove("error");
   
    if ((nameInputEl.value.length < 0) && (commentTextEl.value.length < 0)) {
        nameInputEl.classList.add("error");
        commentTextEl.classList.add("error");
        writeButtonEl.classList.add("error-btn");
        writeButtonEl.disabled === true;
        return;
      } else if ((nameInputEl.value.length < 0) && (commentTextEl.value.length > 0)) {
        nameInputEl.classList.add("error");
        return;
      } else if ((nameInputEl.value.length > 0) && (commentTextEl.value.length < 0)) {
        commentTextEl.classList.add("error");
        return;
      } else {
        fetch("https://wedev-api.sky.pro/api/v1/NastyaTsyf/comments", {
          method: "POST",
          body: JSON.stringify({
            name: nameInputEl.value
              .replaceAll("&", "&amp;")
              .replaceAll("<", "&lt;")
              .replaceAll(">", "&gt;")
              .replaceAll('"', "&quot;"),
            date: new Date(),
            text: commentTextEl.value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
            likes: 0,
            isLiked: false
          })
        }).then((response) => {
          response.json().then(() => getFetchPromise());
        });
    };
    nameInputEl.value = "";
    commentTextEl.value = "";
    writeButtonEl.setAttribute("disabled", true);
    writeButtonEl.classList.add("error-btn");

});

deleteButtonEl.addEventListener("click", () => {
   users.splice(-1, 1);
    renderUsers();
    initLikeButton();
    replyТoСomment();
});


// кнопка лайка
const initLikeButton = () =>{
  const likeButtonElements = document.querySelectorAll(".like-button");
  for (const likeButtonElement of likeButtonElements){
    likeButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = likeButtonElement.dataset.index;
      if (users[index].isLiked === false) {
        users[index].likes = users[index].likes + 1;
        users[index].isLiked = true;
      } else {
        users[index].likes = users[index].likes - 1;
        users[index].isLiked = false;
      }
      renderUsers();
      initLikeButton();
      replyТoСomment();
      }
    )
  }
}
initLikeButton();

//Ответы на комментарии

const replyТoСomment = () =>{
  const listElements = document.querySelectorAll(".comment");
  for (const listElement of listElements){
    listElement.addEventListener("click", () => {
      const commentText = listElement.dataset.comment;
      const userName = listElement.dataset.name;
      commentTextEl.value = ">" + " "  + commentText + " " + userName;
      renderUsers();
      initLikeButton();
      replyТoСomment();
    });
  }
}
replyТoСomment();

console.log("It works!");


