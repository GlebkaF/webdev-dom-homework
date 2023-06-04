"use strict";

  // Получеаем доступ к разметке html в JS

  const elementName = document.getElementById('nameInput');
  const elementComment = document.getElementById('commentInput');
  const listElement = document.getElementById('listComments');
  const buttonElement = document.getElementById('buttonComment');
  const loadingListElement = document.getElementById('loadingList');
  const loadingCommentElement = document.getElementById('loadingComment');
  const addFormElement = document.getElementById('addForm')

//  Массив в который будем рендерить полученные данные
  let comments = [];

// Убираем обработчик загрузки с экрана
  loadingCommentElement.style.display = 'none';

  // Функция обработчика даты
  const DateFormatComment = (commentDate) => {
    const dateComment = new Date(commentDate);
      const formatDate = dateComment.getDate().toString().padStart(2, '0') + '.' +
        (dateComment.getMonth() + 1).toString().padStart(2, '0') + '.' +
        dateComment.getFullYear().toString().slice(-2) + ' ' +
        dateComment.getHours().toString().padStart(2, '0') + ':' +
        dateComment.getMinutes().toString().padStart(2, '0');
        return formatDate
  }
  
  //  Получаем данные из API(Сервера)
  const fetchAndRenderComments = () => {
    return fetch(
      'https://wedev-api.sky.pro/api/v1/alexey-tsukanov/comments',
      {
        method: 'GET'
      })
      .then((response) => {
        return response.json()
      })
      .then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
          const dateComment = new Date(comment.date);
          return {
            name: comment.author.name,
            date: DateFormatComment(comment.date),
            textComment: comment.text,
            likes: comment.likes,
            isActiveLike: false,
          }
        })
        comments = appComments;
        renderComments();
      })
  };

  // Добавляем обработчик клика на кнопку "Написать"

  buttonElement.addEventListener('click', () => {
    loadingCommentElement.style.display = 'block';
    addFormElement.style.display = 'none';

    // Добвляю фукнцию для поторного вызова в случае ошибки от сервера
    const postComment = () => {

      // Защащаем ввод данных
      const protectionHtml = (string) => {
        return string
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
      };

      // Добавляем новый комменрарий в API
      return fetch(
        'https://wedev-api.sky.pro/api/v1/alexey-tsukanov/comments',
        {
          method: 'POST',
          body: JSON.stringify(
            {
              text: protectionHtml(elementComment.value),
              name: protectionHtml(elementName.value),
              forceError: true,
            })
        })
        .then((response) => {
          if (response.status === 201) {
            elementName.classList.remove('error');
            elementComment.classList.remove('error');
            return response.json()
          } if (response.status === 400) {
            throw new Error("Плохой запрос")
            alert("Вы ввели слишком короткое имя или текст комментария");
          } else {
            throw new Error('Сервер не отвечает')
          }
        })
        .then((responseData) => {
          comments = responseData.comments;
          fetchAndRenderComments();
          elementName.value = '';
          elementComment.value = '';
        })
        .catch((error) => {
          loadingCommentElement.style.display = 'none';
          addFormElement.style.display = 'flex';
          if (error.message === "Плохой запрос") {
            elementComment.classList.add('error');
            elementName.classList.add('error');
            alert('Вы ввели слишком короткое имя или текст комментария')
          } if (error.message === "Сервер не отвечает") {
            postComment();
          }
        })
      buttonElement.disabled = true;
    };
    postComment()
  })

  // Отправка коммента с помощью кнопки Enter

  document.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
      buttonElement.click()
    }
  });

  // Активность кнопки "Написать"
  buttonElement.disabled = true;

  elementName.addEventListener('input', () => {
    if (elementName.value.trim() !== "") {
      buttonElement.disabled = false;
    } else {
      buttonElement.disabled = true;
    }
  });

  //Удаление последнего комментария
  const deleteComment = document.getElementById('delComment');
  deleteComment.addEventListener('click', () => {
    const lastCommentIndex = listElement.innerHTML.lastIndexOf(`<li class="comment">`);
    if (lastCommentIndex !== -1) {
      listElement.innerHTML = listElement.innerHTML.substring(0, lastCommentIndex)
    }
    comments.pop();
    renderComments();
  });

  // Добавляем фукцию активности лайка
  const like = () => {
    const likeButtons = document.querySelectorAll('.like-button');
    for (const likeButton of likeButtons) {
      likeButton.addEventListener('click', (e) => {
        e.stopPropagation()

        const index = likeButton.dataset.index;
        if (comments[index].isActiveLike) {
          comments[index].likes--;

        } else {
          comments[index].likes++;
        }
        comments[index].isActiveLike = !comments[index].isActiveLike;
        renderComments();
      })
    }
  };

  // Добавляю обработчик клика на комментарий (ответ на комментарий)
  const initAnswer = () => {
    const commentsElements = document.querySelectorAll(".comment");
    for (const commentElement of commentsElements) {
      commentElement.addEventListener('click', () => {
        elementComment.value = `> ${commentElement.querySelector('.comment-text').innerHTML
          .replaceAll("&amp", "&;")
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">")
          .replaceAll("&quot;", '"')}`
          + `\n\n${commentElement.querySelector('.comment-header').children[0].innerHTML
            .replaceAll("&amp", "&;")
            .replaceAll("&lt;", "<")
            .replaceAll("&gt;", ">")
            .replaceAll("&quot;", '"')}`
      })
    }
  }

  // создаем рендер фукцию для добавления разметки html из JS
  const renderComments = () => {

    const commentsHtml = comments.map((comment, index) => {
      let likeActive = '';
      if (comments[index].isActiveLike) {
        likeActive = '-active-like';
      }
      return `<li class="comment">
<div class="comment-header">
  <div>${comment.name}</div>
  <div>${comment.date}</div>
</div>
<div class="comment-body">
  <div class="comment-text preline">${comment.textComment}</div>
</div>
<div class="comment-footer">
  <div class="likes">
    <span class="likes-counter">${comment.likes}</span>
    <button class="like-button ${likeActive}" data-index="${index}"></button>
  </div>
</div>
</li>`;
    }).join("");
    listElement.innerHTML = commentsHtml;

    loadingListElement.style.display = 'none';
    loadingCommentElement.style.display = 'none';
    addFormElement.style.display = 'flex';

    elementName.value = '';
    elementComment.value = '';

    like();
    initAnswer();
  };

  fetchAndRenderComments();

  console.log("It works!");