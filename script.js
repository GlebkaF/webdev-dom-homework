const commentList = document.querySelector('.comments');
const addForm = document.querySelector('.add-form');
const userName = document.querySelector('.add-form-name');
const textComment = document.querySelector('.add-form-text');
const button = document.querySelector('.add-form-button');
let appComments = [];

  //Добавляем лайк
  const addLikes = (e) => {
    const comment = appComments[e.target.dataset.id];
    comment.like++;
    comment.Iliked = true;
  }
  //Удаляем лайк
  const delLikes = (e) => {
    const comment = appComments[e.target.dataset.id];
    comment.like--;
    comment.Iliked = false;
  }
  //Функция проверки был ли поставлен лайк
  const initLikeClick = () => {
    const likeClickElements = document.querySelectorAll('.likes');
    for (const likeClickElement of likeClickElements) {
      likeClickElement.addEventListener('click', (e) => {
        e.stopPropagation();
        const comment = appComments[e.target.dataset.id];
        if (comment.Iliked) {
          delLikes(e);
        } else {
          addLikes(e);
        }
        renderComments();
      });
    }
  };
  //Получение комментариев из API https://webdev-hw-api.vercel.app/api/v1/andrey-zibin/comments
  const fetchPromise = fetch('https://webdev-hw-api.vercel.app/api/v1/andrey-zibin/comments', {
    method: 'GET',
  });
  fetchPromise.then((response) => {
    // Запускаем, преобразовываем сырые данные от API в JSON-формат
    const jsonPromise = response.json();

    // Подписываемся на результат преобразования
    jsonPromise.then((responseData) => {
      appComments = responseData.comments.map((comment) => {
        return {
          //Имя автора
          name: comment.author.name,
          //Преобразуем дату строку в date
          dates: new Date(comment.date),
          //Текст комментария
          text: comment.text,
          //Количество лайков
          like: comment.likes,
          //Лайки
          Iliked: false,
        }
      })

      comments = appComments;
      renderComments();
    });
  });
  //Рендер комментариев
  function renderComments() {
    const commentHtmlResult = appComments.map((comment, id) => {
      let Iliked = '';
      let dates = '';

      if (comment.Iliked) {
        Iliked = '-active-like';
      }

      if (comment.date) {
        dates = comment.date;
      } else {
        const date = new Date();
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear().toString().slice(-2);
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        dates = `${day}.${month}.${year} ${hours}:${minutes}`;
      }

      return `<li class="comment" data-id="${id}">
<div class="comment-header">
<div class="comment-name">${comment.name}</div>
<div>${dates}</div>
</div>
<div class="comment-body">
<div class="comment-text">${comment.text}</div>
</div>
<div class="comment-footer">
<div class="likes">
<span class="likes-counter">${comment.like}</span>
<button class="like-button ${Iliked}" data-id="${id}"></button>
</div>
</div>
</li>`;
    }).join("");

    commentList.innerHTML = commentHtmlResult;
    initLikeClick();
    addCommentListener();
  }
  //Функция, которая отправляет новый добавленный комментарий на сервер по указанному API
  const sendCommentToServer = (comment) => {
    fetch('https://webdev-hw-api.vercel.app/api/v1/andrey-zibin/comments', {
      method: 'POST',
      body: JSON.stringify(comment),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Обработка ответа сервера (при необходимости)
        console.log('Комментарий успешно отправлен на сервер:', responseData);
      })
      .catch((error) => {
        // Обработка ошибок при отправке на сервер
        console.error('Ошибка при отправке комментария на сервер:', error);
      });
  };
  //Добавление комментария
  const addComment = () => {
    const date = new Date();

    if (validate()) {
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear().toString().slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

      const newComment = {
        name: userName.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        date: formattedDate,
        text: textComment.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        like: 0,
      };

      appComments.push(newComment);
      sendCommentToServer(newComment); // Отправка комментария на сервер


      renderComments();
      textComment.value = "";
      userName.value = "";
      button.setAttribute('disabled', '');
    }
  };
  //Проверка форм на введенные данные
  const validate = () => {
    const userNameValue = userName.value.trim();
    const textCommentValue = textComment.value.trim();

    const isUserNameValid = userNameValue.length >= 3;
    const isTextCommentValid = textCommentValue.length >= 3;

    userName.classList.toggle('error', !isUserNameValid);
    textComment.classList.toggle('error', !isTextCommentValid);

    if (!isUserNameValid) {
      if (userNameValue === "Напишите не менее 3 символов") {
        userName.placeholder = "Напишите не менее 3 символов";
      } else {
        userName.value = "";
        userName.placeholder = "Напишите не менее 3 символов";
        console.log("Напишите не менее 3 символов (Имя)");
      }
    }

    if (!isTextCommentValid) {
      if (textCommentValue === "Напишите не менее 3 символов") {
        textComment.placeholder = "Напишите не менее 3 символов";
      } else {
        textComment.value = "";
        textComment.placeholder = "Напишите не менее 3 символов";
        console.log("Напишите не менее 3 символов (Текст комментария)");
      }
    }

    return isUserNameValid && isTextCommentValid;
  };
  //Слушаем кнопку и добавляем комментарий
  button.addEventListener('click', (event) => {
    addComment();
  });
  //Слушаем ввод в поле и добавляем комментарий
  addForm.addEventListener('input', (event) => {
    if (validate) {
      button.removeAttribute('disabled');
      button.classList.remove('add-form-button-disabled');
    }
  });
  //Слушаем нажатие Enter
  addForm.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault();
      addComment();
    }
  });
  renderComments();
  // Функция добавляет ответ на комментарий
  function addCommentListener() {
    const comments = document.querySelectorAll('.comment');
    comments.forEach((comment) => {
      comment.addEventListener('click', () => {
        const answer = comment.querySelector('.comment-body').textContent;
        const nameUser = comment.querySelector('.comment-name').textContent;
        textComment.value = `>${answer}${nameUser}.,`;
      });
    });
  }
  addCommentListener();