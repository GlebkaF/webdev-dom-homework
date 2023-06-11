"use strict";

const writeButtonEl = document.getElementById("write-button");
const nameInputEl = document.getElementById("name-input");
const commentTextEl = document.getElementById("comment-text");
const listEl = document.getElementById("comment-list");
let currentDate = new Date();
const deleteButtonEl = document.getElementById("delete-button");
const list = document.querySelectorAll(".comment");


const users = [
  {
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    comment: " Это будет первый комментарий на этой странице",
    like: 3,
    isLiked: false
  },
  {
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    comment: "Мне нравится как оформлена эта страница! ❤",
    like: 75,
    isLiked: false
  }
];

const renderUsers = () =>{
  const usersHtml = users.map((user, index) =>{
    return  `<li class="comment">
    <div class="comment-header">
      <div>${user.name}</div>
      <div>${user.date}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${user.comment}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${user.like}</span>
        <button class="like-button ${user.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
      </div>
    </div>
    </li>`
  }).join('');
  listEl.innerHTML = usersHtml;
};

renderUsers();


//date of comment
let day = currentDate.getDay();
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
        users.push({
          name: nameInputEl.value,
          date: commentDate,
          comment: commentTextEl.value,
          like: 0,
          isLiked: false

        })
        renderUsers();
        initLikeButton();

    };
    
    nameInputEl.value = "";
    commentTextEl.value = "";
    writeButtonEl.setAttribute("disabled", true);
    writeButtonEl.classList.add("error-btn");

});

deleteButtonEl.addEventListener("click", () => {
   users.splice(-1, 1);
    renderUsers();
});


// кнопка лайка
const initLikeButton = () =>{
  const likeButtonElements = document.querySelectorAll(".like-button");
  for (const likeButtonElement of likeButtonElements){
    likeButtonElement.addEventListener("click", () => {
      const index = likeButtonElement.dataset.index;
      if (users[index].isLiked === false) {
        users[index].like = users[index].like + 1;
        users[index].isLiked = true;
        renderUsers();
        initLikeButton();
      } else {
        users[index].like = users[index].like - 1;
        users[index].isLiked = false;
        renderUsers();
        initLikeButton();
      }
      }
    )
  }
}
initLikeButton();




console.log("It works!");