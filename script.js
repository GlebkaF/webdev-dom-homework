"use strict";
console.log("It works!");
const buttonElement = document.getElementById("add-button");
const commentElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");

// Подключаем приложение комментариев к API
// fetch - запускает выполнение запроса к api
const fetchPromise = fetch('https://wedev-api.sky.pro/api/v1/nadya-terleeva/comments', {
  method: "GET"
});

// подписываемся на успешное завершение запроса с помощью then
fetchPromise.then((response) => {

  const jsonPromise = response.json();
  jsonPromise.then((responseData) => {
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
    };

    // Преобразовываем данные из формата API в формат приложения
    const appComments = responseData.comments.map((comment) => {
      return {
        // Достаем имя автора
        name: comment.author.name,
        // Преобразовываем дату строку в Data
        data: formatDate(new Date()),
        comment: comment.text,
        // В API пока вообще нет признака лайкнутости
        // Поэтому пока добавляем заглушку
        likes: true,
        numberLikes: comment.likes
             }
    })
  
    comments = appComments;
    renderComments();
  });
});

let comments = [
// {
//   name: "Глеб Фокин",
//   data: "12.02.22 12:18",
//   comment: "Это будет первый комментарий на этой странице",
//   likes: false,
//   numberLikes: 3
// },
// {
//   name: "Варвара Н.",
//   data: "13.02.22 19:22",
//   comment: "Мне нравится как оформлена эта страница! ❤ ",
//   likes: true,
//   numberLikes: 75
// }
]

function appComment(userName, userComment, userData) {
  const url = 'https://wedev-api.sky.pro/api/v1/nadya-terleeva/comments';
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      name: userName,
      text: userComment,
      data: userData
    })
  }).then((response) => {
    // обработка успешного выполнения запроса
    nameInputElement.value = '';
    textInputElement.value = '';
    renderComments();
  }).catch((error) => {
    // обработка ошибок запроса
    console.error(error);
  });
}

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
  };

  //  nameInputElement.value = "";
  //  textInputElement.value = "";
  //  renderComments(); 
  // }
  //   comments.push({
  //   name: nameInputElement.value,
  //   data: formatDate(new Date()),
  //   comment: textInputElement.value.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
  //   likes: false,
  //   numberLikes: 0
  //  })

  //  nameInputElement.value = "";
  //  textInputElement.value = "";

  // renderComments(); 
  appComment(nameInputElement.value, textInputElement.value, formatDate(new Date()));
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
