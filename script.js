const inputName = document.querySelector(".add-form-name");
const inputText = document.querySelector(".add-form-text");
const comments = document.querySelector(".comments");
const buttonAdd = document.querySelector(".add-form-button");
const addFormBox = document.querySelector('.add-form');
const preloader =  document.querySelector(".preloader");


// ===== EVENTS =====

const eventLike = () => {
  document.querySelectorAll(".like-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      objComment = arrComments[button.dataset.index];
      button.classList.add('-loading-like');
      delay(2000).then(() => {
        if (objComment.isLiked) {
          objComment.likes -= 1;
          objComment.isLiked = false;
        } else {
          objComment.likes += 1;
          objComment.isLiked = true;
        }
        renderAllComments();
      })
    });
  });
};
const eventEdit = () => {
  document.querySelectorAll(".edit-button").forEach((button, key) => {
    button.addEventListener("click", (event) => {
      // отменяем всплытие
      event.stopPropagation();

      objComment = arrComments[button.dataset.index];
      if (objComment.isEdit) {
        if (objComment.text.trim() === "") return; // в случае, если человек сотрет полностью комментарий кнопка сохранить станет неактивна;
        button.innerHTML = "Редактировать";
        objComment.isEdit = false;
      } else {
        button.innerHTML = "Сохранить";
        objComment.isEdit = true;
      }
      renderAllComments();
    });
  });
};
const eventReply = () => {
  document.querySelectorAll(".comment").forEach((item) => {
    item.addEventListener("click", () => {
      objComment = arrComments[item.dataset.index];
      let str = objComment.text;

      // в случае если у нас будет реплай на реплай, мы оставим только ответ
      // цикл на случай, если будет несколько реплаев
      while (str.indexOf("<div class='quote'>") !== -1) {
        const substr = str.substring(
          0,
          str.indexOf("</div>") + "</div>".length
        );
        str = str.replace(substr, "");
      }

      inputText.value += `[BEGIN_QUOTE]${str} - ${objComment.author.name}[END_QUOTE]\n\n`;

      // переносим пользователя в поле ввода текста
      inputText.focus();
    });
  });
};
const evenEditInput = () => {
  document.querySelectorAll(".input-text").forEach((input) => {
    input.addEventListener("keyup", (key) => {
      objComment = arrComments[input.dataset.index];
      objComment.text = input.value;
    });

    // В случае редактирования, при клики мыши срабатывало событие реплая
    input.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });
};
buttonAdd.addEventListener("click", sendComment);
inputName.addEventListener("keyup", (key) => {
  if (key.code === "Enter") {
    key.preventDefault();
    inputText.focus();
  }
});
inputText.addEventListener("keydown", (key) => {
  if (key.code === "Enter") {
    // чтобы не срабатывал enter
    key.preventDefault();
    sendComment();
  }
});
inputText.addEventListener("input", switchButton);
inputName.addEventListener("input", switchButton);


// масив комментариев, тут хранятся все комментарии
let arrComments = [];


// Получаем из API все комменты
const getComments = () => {
  preloader.classList.add("--ON");
  addFormBox.classList.remove('--ON');

  fetch("https://webdev-hw-api.vercel.app/api/v1/Komoza_Maxim/comments", {
    method: "GET",
  })
  .then((response) => response.json()
  .then((data) => {
      arrComments = data.comments;
      renderAllComments();
      preloader.classList.remove("--ON");
      addFormBox.classList.add("--ON");
    })
  );
};

function sendComment() {
  // проверка на пустые поля
  if (
    inputName.value.trim().length <= 3 ||
    inputText.value.trim().length <= 3
  ) {
    return;
  }

  preloader.classList.add("--ON");
  addFormBox.classList.remove("--ON");

  fetch("https://webdev-hw-api.vercel.app/api/v1/Komoza_Maxim/comments", {
    method: "POST",
    body: JSON.stringify({
      name: inputName.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      text: inputText.value
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("[BEGIN_QUOTE]", "<div class='quote'>")
        .replaceAll("[END_QUOTE]", "</div>"),
    })
  })
  .then((response) => response.json()
  .then((data) => {
    if (data.result === 'ok') {
        getComments();
    }
  })
);

  inputName.value = "";
  inputText.value = "";

  switchButton();
};

// форматирование даты
const getDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};


const renderComment = (id, name, text, date, isLike, likeCounter, isEdit) => {
  comments.innerHTML += ` 
        <li class="comment" data-index="${id}">
            <div class="comment-header">
            <div>${name}</div>
            <div>${date}</div>
            </div>
            <div class="comment-body">
                ${
                  isEdit
                    ? `<textArea data-index="${id}" class="input-text">${text}</textArea>`
                    : `<div class="comment-text">${text}</div>`
                }
                <button data-index="${id}" class="edit-button">${
    isEdit ? "Сохранить" : "Редактировать"
  }</button>
            </div>
            <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter">${likeCounter}</span>
                <button data-index="${id}" class="like-button ${
    isLike ? "-active-like" : ""
  }"></button>
            </div>
            </div>
        </li>
    `;
};
const renderAllComments = () => {
  // перед рендером удаляем все комменты которые были, чтобы они не дублировались
  comments.innerHTML = "";

  arrComments.forEach((comment, index) =>
    // id не передаю - он поломанный
    renderComment(
      index,
      comment.author.name,
      comment.text,
      getDate(new Date(comment.date)),
      comment.isLiked,
      comment.likes,
      comment.isEdit
    )
  );

  // заново добавляем евенты на все кнопки, чтобы евент попал на новый коммент с кнопкой
  eventLike();
  eventEdit();
  evenEditInput();
  eventReply();
};


function switchButton () {
  // Проверка на > 3 так как в другом случае api даст ошибку
  if (inputName.value.trim().length > 3 && inputText.value.trim().length > 3) {
    buttonAdd.classList.add("active");
    buttonAdd.classList.remove("inactive");
  } else {
    buttonAdd.classList.add("inactive");
    buttonAdd.classList.remove("active");
  }
};

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

// Пока у меня нет доступа к изменению или удалению, удаление не работает

// document.querySelector(".del-last-comment").addEventListener("click", () => {
//   const indexLast = comments.innerHTML.lastIndexOf('<li class="comment">');
//   comments.innerHTML = comments.innerHTML.slice(0, indexLast);

//   // так же удаляем из массива, чтобы не было ошибок при рендере
//   arrComments.pop();

//   // Заново накидываем ивенты, они почему-то сбрасываются
//   eventLike();
//   eventEdit();
//   evenEditInput();
// });

// start
getComments();
