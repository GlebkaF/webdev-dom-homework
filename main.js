const btn = document.querySelector(".add-form-button");
const ul = document.querySelector(".comments");
const nameUser = document.querySelector(".add-form-name");
const commentUser = document.querySelector(".add-form-text");
const form = document.querySelector(".add-form");
const del = document.querySelector(".remove-form-button");

//! Массив с комментариями
const userComments = document.querySelector('.comments');
let userComment = [];

//? Работаем с API GET
function apiGet() {
  fetch("https://wedev-api.sky.pro/api/v1/nikita--zhvalik/comments", {
      method: "GET"
  }).then((response) => {
  response.json().then((responseData) => {
    userComment = responseData.comments.map((comment) => {
      //! Работа с временем
      let date = new Date(comment.date);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear() - 2000;
      let hour = date.getHours();
      let minute = date.getMinutes();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      date = day + "." + month + "." + year + "  " + hour + ":" + minute;

      //! Возвращаем список комментариев из API
      return {
        id: comment.id,
        name: comment.author.name,
        date: date,
        comment: comment.text,
        likes: comment.likes,
        isLike: true,
      }
      
    })
    renderUserComments();
  });
});
}
apiGet();

//! создание нового комментария
function addComment() {
  // userComment.push({
  //   name: nameUser.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  //   date: date,
  //   comment: commentUser.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
  //   likes: 0,
  //   isLike: false,
  //   isEdit: false,
  // });
    //? Работаем с API POST
    fetch("https://wedev-api.sky.pro/api/v1/nikita--zhvalik/comments", {
      method: "POST",
      body: JSON.stringify({
        text: commentUser.value,
        name: nameUser.value,
      }),
    }).then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((responseData) => {
    //! Вызываем список из API
    renderUserComments();
    });
    });

  //! Добавляем чтение клика по лайку
  initLikesBtn();
  //! Чистка текстовых полей формы после отправки
  nameUser.value = "";
  commentUser.value = "";
  //! Добавляем чтение комментариев после добавления комментария
  renderUserComments();
  //! Делаем отправку некликабельной, если у нас не заполнены поля
  checkFields();
  //! Вызываем новый список комментариев после добавления нового коммента в список API
  apiGet();
}


//! Обходим массив лайков до и после добавления комментариев
const initLikesBtn = () => {
  const likeBtns = document.querySelectorAll('.like-button');
  for (const likeBtn of likeBtns) {
    const index = likeBtn.dataset.index;
    likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (userComment[index].isLike === true) {
          userComment[index].likes = userComment[index].likes += 1;
          userComment[index].isLike = false;
        }
        
        else if (userComment[index].isLike === false) {
          userComment[index].likes = userComment[index].likes -= 1;
          userComment[index].isLike = true;
        }
      renderUserComments();
    });
  }
}

//! Обходим массив кнопок 'редактировать'
const changeComment = () => {
  const changeBtns = document.querySelectorAll('.change-button');
  for (const changeBtn of changeBtns) {
    changeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = changeBtn.dataset.index;
      let findComment = document.getElementById('changedText');
        if (userComment[index].isEdit === true) {
          userComment[index].comment = findComment.value;
          userComment[index].isEdit = false;
        }
        else if (userComment[index].isEdit === false) {
          userComment[index].isEdit = true;
        }
      renderUserComments();
      });
  }
}

//! Обходим массива textarea для отмены заполнения поля при клике на инпут
const findTextarea = () => {
  const textareas = document.querySelectorAll('.add-form-text_comment');
  for (const textarea of textareas) {
    textarea.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  }
}

//! Ответ на комментарий
// function commentComment() {
//   const comments = document.querySelectorAll(".comment");
//   for (const comment of comments) {
//     comment.addEventListener('click', () => {
//       const index = comment.dataset.index;
//       commentUser.value =`QUOTE_BEGIN ${userComment[index].name + ':' + ' ' + userComment[index].comment} QUOTE_END`;
//     });
//   };
// }

//! Срабатывание добавления комментария при нажатии на кнопку 'Написать'
btn.addEventListener("click", () => {
  addComment();
});

//! Срабатывание добавления комментария при нажатии на кнопку Enter
form.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    addComment();
  }
});

//! Удаление последнего коммента
del.addEventListener("click", () => {
  ul.lastElementChild.remove();
      // //? Работаем с API POST
      // const id = del.dataset.id;
      // fetch("https://wedev-api.sky.pro/api/v1/nikita-zhvalik/comments/" + id, {
      //   method: "DELETE",
      // }).then((response) => {
      // const jsonPromise = response.json();
      // jsonPromise.then((responseData) => {
      // userComment = responseData.comments.map((comment) => {
      //   return {
      //     id: comment.id,
      //     name: comment.author.name,
      //     date: new Date(comment.date),
      //     comment: comment.text,
      //     likes: comment.likes,
      //     isLike: false,
      //   }
      // })
      // renderUserComments();
      // });
      // });
});

//! Удаление коммента
// function delBtn1() {
//   const delBtns = document.querySelectorAll('.delete-button');
//   for (const delBtn of delBtns) {
//     delBtn.addEventListener("click", (e) => {
//           e.stopPropagation();
//           //? Работаем с API DELETE
//           const id = delBtn.dataset.id;
//           console.log(id);
//           fetch("https://wedev-api.sky.pro/api/v1/nikita--zhvalik/comments/" + id, {
//             method: "DELETE",
//           }).then((response) => {
//             response.json().then((responseData) => {
//           renderUserComments();
//           });
//           });
//     });
//   }
// }

//! Делаем отправку некликабельной, если у нас не заполнены поля
function checkFields() {
  if (nameUser.value && commentUser.value) {
    btn.disabled = false;
    btn.classList.remove('btn-gray');
  } else {
    btn.disabled = true;
    btn.classList.add('btn-gray');
  }
}
checkFields();

nameUser.addEventListener('input', checkFields);
commentUser.addEventListener('input', checkFields);

//! Рендерим массив
const renderUserComments = () => {
  userComments.innerHTML = userComment.map((comments, index) => {
    const commentText = comments.isEdit === true ? `<textarea type="form" class="add-form-text_comment" id="changedText" data-index=${index} rows="4">${comments.comment}</textarea>` : `${comments.comment}`;
    const btnTextChange = comments.isEdit === true ? `Сохранить` : `Редактировать`;

    return `
    <li class="comment">
    <div class="comment-header">
      <div>${comments.name}</div>
      <div>${comments.date}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${commentText.replaceAll(`QUOTE_BEGIN`, "<div class='quote'>").replaceAll(`QUOTE_END`, "</div>")}
      </div>
    </div>
    <div class="comment-footer">

      <div class="change">
        <button class="change-button" data-index=${index}>${btnTextChange}</button>
      </div>

      <div class="delete">
      <button class="delete-button" data-id=${comments.id}>Удалить</button>
      </div>

      <div class="likes">
        <span class="likes-counter">${comments.likes}</span>
        <button class="like-button ${comments.isLike ? "" : "-active-like"}" data-index=${index} data-like=${comments.isLike}></button>
      </div>
    </div>
  </li>`
}).join('');
  
  //! Добавляем рендер лайка после добавления комментария
  initLikesBtn();
  //! Добавляем рендер кнопки 'редактировать'
  changeComment();
  //! Добавляем рендер ответа на комментарий
  // commentComment();
  //! Добавляем рендер ответа на комментарий для нахождения textarea
  findTextarea();
};
renderUserComments();



