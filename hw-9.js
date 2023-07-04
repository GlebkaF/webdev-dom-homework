"use strict";

const writeButtonEl = document.getElementById("write-button");
const nameInputEl = document.getElementById("name-input");
const commentTextEl = document.getElementById("comment-text");
let listEl = document.getElementById("comment-list");
const deleteButtonEl = document.getElementById("delete-button");

let users = [];
//Получить список комментариев

const getFetchPromise = () => {
   return fetch("https://wedev-api.sky.pro/api/v1/NastyaTsyf/comments", {
  method: "GET"
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Сервер сломался");
      } else {
        return response.json();
      }
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: getCommentDate(comment.date),
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
    })
    .catch((error) => {
      if (error.message === "Сервер сломался") {
        alert("Сервер сломался, попробуй позже");
        console.log(error);
        return;
      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
        console.log(error);
        return;
      }
    });
}

const addComment = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/NastyaTsyf/comments", {
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
  })  
}

const renderUsers = () =>{
  const usersHtml = users.map((user, index) =>{
    return  `<li class="comment" data-comment="${user.text}" data-name="${user.name}">
    <div class="comment-header">
      <div>${user.name}</div>
      <div>${user.date}</div>
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

//loader

const showDownload = () => {
  listEl.innerHTML = `<h3 style="font-family: Helvetica; color: #ffffff;">Пожалуйста подождите. Загружаю комментарии...</h3>`;
  deleteButtonEl.style.display = 'none';
  return getFetchPromise()
    .then(() => {
      deleteButtonEl.style.display = 'flex';
    });
}
showDownload();


//date of comment
const getCommentDate = (date) => {
  let currentDate = new Date(date);
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
        addComment()
          .then((response) => {
            if (response.status === 500) {
              throw new Error("Сервер сломался");
            } else if (response.status === 400) {
              throw new Error("Плохой запрос");
            } else {
              document.getElementById("load").classList.remove('hidden');
              document.getElementById("add").classList.add('hidden');
              return response.json();
            }
          })
          .then(() => {
            return getFetchPromise();
          })
          .then(() => {
            document.getElementById("add").classList.remove('hidden');
            document.getElementById("load").classList.add('hidden');
          })
          .then(() => {
            nameInputEl.value = "";
            commentTextEl.value = "";
            writeButtonEl.setAttribute("disabled", true);
            writeButtonEl.classList.add("error-btn");
          })
          .catch((error) => {
            if (error.message === "Сервер сломался") {
              alert("Сервер сломался, попробуй позже");
              console.log(error);
              return;
            } else if (error.message === "Плохой запрос") {
              alert("Имя и комментарий должны быть не короче 3 символов");
              document.getElementById("add").classList.remove('hidden');
              document.getElementById("load").classList.add('hidden');
              nameInputEl.classList.add("error");
              commentTextEl.classList.add("error");
              return;
            } else {
              alert("Кажется, у вас сломался интернет, попробуйте позже");
              console.log(error);;
              return;
            }
          });
    };

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


