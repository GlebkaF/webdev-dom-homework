"use strict";

const host = "https://wedev-api.sky.pro/api/v2/NastyaTsyf/comments";

let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

token = null;

let users = [];
//Получить список комментариев

const fetchUsersAndRender = () => {
   return fetch(host, {
  method: "GET",
  headers: {
    Authorization: token
  }
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
      renderApp();
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
fetchUsersAndRender();


// кнопка лайка
const initLikeButton = (users) =>{
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
      renderApp();
      }
    )
  }
}

//Ответы на комментарии

const replyТoСomment = (commentTextEl) =>{
  const listElements = document.querySelectorAll(".comment");
  for (const listElement of listElements){
    listElement.addEventListener("click", () => {
      const commentText = listElement.dataset.comment;
      const userName = listElement.dataset.name;
      commentTextEl.value = ">" + " "  + commentText + " " + userName;
    });
    //renderApp();
  }
}

const renderApp = () =>{
  const appEl = document.getElementById("app");

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

  if (!token) {
    let appHtml = `
          <ul class="comments" id="comment-list">
            ${usersHtml}
          </ul>
          <div class="" id="go-to-login">
          <p>Чтобы добавить комментарий, <span>авторизуйтесь</span></p>
          </div>
       `
    appEl.innerHTML = appHtml;
    document.getElementById("go-to-login").addEventListener("click", () => {
      appHtml = `<div id="login">
          <div class="add-form">
            <h2 class="comment-header">Форма входа</h2>
            <input
              id="login-input"
              type="text"
              class="add-form-name"
              placeholder="Введите логин"
            />
            <br>
            <input
              id="password-input"
              type="password"
              class="add-form-name"
              placeholder="Введите пароль"
            />
            <div class="add-form-row">
              <button class="add-form-button" id="login-button">Войти</button>
            </div>
        </div>
        </div>`
      appEl.innerHTML = appHtml;
      document.getElementById("login-button").addEventListener("click", () => {
        token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
        fetchUsersAndRender();
      });
    })
    return;
  }

  let appHtml = `
        <ul class="comments" id="comment-list">
          ${usersHtml}
          </ul>
          <div class="add-form-row" style="justify-content: center" >
            <button class="add-form-button" id="delete-button">Удалить комментарий</button>
          </div>
      <div id="add">
        <div class="add-form">
          <input
            id="name-input"
            type="text"
            class="add-form-name"
            placeholder="Введите ваше имя"
          />
          <textarea
            id="comment-text"
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш коментарий"
            rows="4"
          ></textarea>
          <div class="add-form-row">
            <button class="add-form-button" id="write-button">Написать</button>
          </div>
        </div>
      </div>
      <div id="load" class="hidden">
        <h3 style="font-family: Helvetica; color: #ffffff;">Комментарий добавляется...</h3>
      </div>`
    appEl.innerHTML = appHtml;


  const writeButtonEl = document.getElementById("write-button");
  const nameInputEl = document.getElementById("name-input");
  const commentTextEl = document.getElementById("comment-text");
  let listEl = document.getElementById("comment-list");
  const deleteButtonEl = document.getElementById("delete-button");

  const addComment = () => {
    return fetch(host, {
      method: "POST",
        headers: {
        Authorization: token
      },
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

  //loader

  //const showDownload = () => {
  //  listEl.innerHTML = `<h3 style="font-family: Helvetica; color: #ffffff;">Пожалуйста подождите. Загружаю комментарии...</h3>`;
  //  deleteButtonEl.style.display = 'none';
  //  return getFetchPromise()
  //    .then(() => {
  //      deleteButtonEl.style.display = 'flex';
  //    });
  //}
  //showDownload();

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
              return fetchUsersAndRender();
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
      //renderApp();
  });

  initLikeButton(users);
  replyТoСomment(commentTextEl);
};
renderApp();



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

console.log("It works!");


