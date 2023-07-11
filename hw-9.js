"use strict";

import renderUsers from "./render.js";

const writeButtonEl = document.getElementById("write-button");
const nameInputEl = document.getElementById("name-input");
const commentTextEl = document.getElementById("comment-text");
let listEl = document.getElementById("comment-list");
const deleteButtonEl = document.getElementById("delete-button");

let users = [];
//Получить список комментариев

const getFetchPromise = (object) => {
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
      object = appComments;
      console.log(object);
      renderUsers(listEl, getListUsers, object, commentTextEl);
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

const addComment = (nameText, commentText) => {
  return fetch("https://wedev-api.sky.pro/api/v1/NastyaTsyf/comments", {
    method: "POST",
    body: JSON.stringify({
      name: nameText.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      date: new Date(),
      text: commentText.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
      likes: 0,
      isLiked: false
    })
  })  
}

const getListUsers = (obj, index) => {
  {return  `<li class="comment" data-comment="${obj.text}" data-name="${obj.name}">
  <div class="comment-header">
    <div>${obj.name}</div>
    <div>${obj.date}</div>
  </div>
  <div class="comment-body">
    <div class="comment-text">
      ${obj.text}
    </div>
  </div>
  <div class="comment-footer">
    <div class="likes">
      <span class="likes-counter">${obj.likes}</span>
      <button class="like-button ${obj.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
    </div>
  </div>
  </li>`
};
};
//renderUsers(listEl, getListUsers, users);

//loader

const showDownload = () => {
  listEl.innerHTML = `<h3 style="font-family: Helvetica; color: #ffffff;">Пожалуйста подождите. Загружаю комментарии...</h3>`;
  deleteButtonEl.style.display = 'none';
  return getFetchPromise(users)
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
        addComment(nameInputEl, commentTextEl)
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
            return getFetchPromise(users);
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
});

console.log("It works!");


