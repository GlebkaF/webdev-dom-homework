const buttonElement = document.querySelector('button.add-form-button');

const listElement = document.querySelector('.comments');

const inputNameElement = document.querySelector('.add-form-name');

const textareaElement = document.querySelector('.add-form-text');

const loaderCommentsElement = document.getElementById('loaderComments');


const myDate = () => {
  const getDate = new Date();
  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    timezone: "UTC",
    hour: "numeric",
    minute: "2-digit"
  };
  
  options.hour = "2-digit";
  return getDate.toLocaleDateString("ru-Ru", options).split(', ').join(' ');
}

//выключение кнопки

const validateButton = () => {
  if (!inputNameElement.value || !textareaElement.value) {
    buttonElement.disabled = true;
  } else buttonElement.disabled = false;
}

const initDisabledButtonElement = () => {
  validateButton();
  document.querySelectorAll(".add-form-text,.add-form-name").forEach((input) => {
    input.addEventListener("input", () => {
      validateButton();
    });
  });
};

initDisabledButtonElement();


//обезопасить ввод данных пользователя

const secureInput = (safeText) => {
  return safeText
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
  //.replaceAll("&", "&amp;")
  //.replaceAll('"', "&quot;");
}

//GET API

let comments = [];

//функция GET

const getFetchPromise = () => {
  loaderCommentsElement.classList.remove('-display-none');
  return fetch('https://webdev-hw-api.vercel.app/api/v1/:natalvod/comments',{
    method: "GET"
  }).then((response) => {
  return response.json();
  }).then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: secureInput(comment.author.name),
        date: myDate(new Date(comment.date)),
        text: secureInput(comment.text),
        likes: comment.likes,
        isLike: false,
      };
    });
    comments = appComments;
    loaderCommentsElement.classList.add('-display-none');
    renderComments();
  });
}


//рендер функция

const renderComments = () => {
  const commentHtml = comments.map((comment, index) => {
    return `<li class="comment" data-name='${comment.name}' data-comment='${comment.text}'>
  <div class="comment-header">
    <div>${comment.name}</div>
    <div>${myDate(new Date(comment.date))}</div>
  </div>
  <div class="comment-body">

    ${comment.isEdit ? `<textarea class= "edit-area-text" onclick = "event.stopPropagation()">${comment.comment}</textarea>` : `<div class="comment-text" data-index='${index}' data-name='${comment.name}' data-comment='${comment.text}'>${comment.text.replaceAll('*_', '<div class="quote">').replaceAll('__*', '</div>')}</div>`}
  
  </div>
  <div class="comment-footer">
   <div class="likes">
    <span class="likes-counter">${comment.likes}</span>

    <button class="${comment.isLike ? "like-button -active-like" : "like-button"}" data-index='${index}'></button>

    ${comment.isEdit ? `<button class="save-button button-comment" data-index='${index}'>Сохранить</button>` : `<button class="edit-button button-comment" data-index='${index}'>Редактировать</button>`}
    
    <button class = "delete-button button-comment" data-index='${index}'>Удалить комментарий</button>
   </div>
  </div>
</li>`
  }).join('');

  listElement.innerHTML = commentHtml;

  initChangeLikeButtonListeners();
  initEditButtonListeners();
  deleteComment();
  //answerToComment(); ДЗ 2.11
  answerQuoteToComment(); // ДЗ со звездочкой 2.11
}

//редактировать комментарии

const initEditButtonListeners = () => {
  const editButtons = document.querySelectorAll(".edit-button");
  for (const editButton of editButtons) {
    editButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = editButton.dataset.index;

      if (comments[index].isEdit === false) {
        comments[index].isEdit = true;

      } else {
        comments[index].isEdit = false;
        const textareaEditElements = document.querySelectorAll(".edit-area-text");
        for (const textareaEditElement of textareaEditElements) {
          comments[index].comment = textareaEditElement.value;
        }
      }
      renderComments();
    })
  };
  const saveButtons = document.querySelectorAll(".save-button");
  for (const saveButton of saveButtons) {
    saveButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = saveButton.dataset.index;
      if (comments[index].isEdit === false) {
        comments[index].isEdit = true;
      } else {
        comments[index].isEdit = false;
        const textareaEditElements = document.querySelectorAll(".edit-area-text");
        for (const textareaEditElement of textareaEditElements) {
          comments[index].comment = textareaEditElement.value;
        }
      }
      renderComments()

    });
  }
};

//Смена класса кнопки лайка

const initChangeLikeButtonListeners = () => {
  const likeButtonElements = document.querySelectorAll('.like-button');

  for (const likeButtonElement of likeButtonElements) {
    likeButtonElement.addEventListener('click', (event) => {
      event.stopPropagation();
      const index = likeButtonElement.dataset.index;

      if (comments[index].isLike === false) {
        comments[index].likes += 1;
        comments[index].isLike = true;


      } else {
        comments[index].likes -= 1;
        comments[index].isLike = false;
      }

      renderComments();
    })
  }
};


//Ответ на комментарий (ДЗ 2.11)

const answerToComment = () => {
  const commentTexts = document.querySelectorAll('.comment-text');
  for (const commentText of commentTexts) {
    commentText.addEventListener('click', (event) => {
      event.stopPropagation();
      const userName = commentText.dataset.name;
      const userComment = commentText.dataset.comment;
      // const index = el.dataset.index;
      textareaElement.value = `>${userComment} \n${userName}`;
      renderComments();
    })
  }
}

answerToComment();

//Ответ на комментарий с цитатой (задание со звездочкой 2.11)

const answerQuoteToComment = () => {
  const commentListItems = document.querySelectorAll('.comment');
  for (const commentListItem of commentListItems) {
    commentListItem.addEventListener('click', () => {
      const userName = commentListItem.dataset.name;
      const userComment = commentListItem.dataset.comment;
      textareaElement.value = `*_${userName}: \n${userComment}__*`;
    })
  }
}
answerQuoteToComment();

//удаление комментария по отдельности

const deleteComment = () => {
  const deleteButtonElements = document.querySelectorAll('.delete-button');
  for (const deleteButtonElement of deleteButtonElements) {
    deleteButtonElement.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = deleteButtonElement.dataset.index;
      comments.splice(index, 1);
      renderComments();
    });
  }
};

deleteComment();

//удаление последнего комментария

const deleteLastComment = () => {
  const deleteLastButtonElement = document.querySelector('.add-form-button--remove');

  deleteLastButtonElement.addEventListener('click', () => {
    comments.pop();
    renderComments();
  });
};

deleteLastComment();
getFetchPromise();
renderComments();

//Функция POST

const postFetchPromise = () => {
  return fetch('https://webdev-hw-api.vercel.app/api/v1/:natalvod/comments', {
    method: "POST",
    body: JSON.stringify({
      name: secureInput(inputNameElement.value),
      date: myDate(new Date),
      text: secureInput(textareaElement.value),
      likes: 0,
      isLike: false,
    }),
  }).then((response) => {
    return response.json()
  }).then(() => {
    return getFetchPromise();
  })
}


//добавление нового комментария

buttonElement.addEventListener('click', () => {
  inputNameElement.classList.remove('error');
  textareaElement.classList.remove('error')
  if (!inputNameElement.value || !textareaElement.value) {
    inputNameElement.classList.add('error');
    textareaElement.classList.add('error');
    return;
  };

  buttonElement.disabled = true;
  buttonElement.textContent = "Добавляется..."
  postFetchPromise().then(() => {
    buttonElement.textContent = "Написать"
  });

  renderComments();

  inputNameElement.value = '';
  textareaElement.value = '';
});

//ввод по кнопке enter

const formEnter = document.querySelector('.add-form');
formEnter.addEventListener('keyup', (ent) => {
  if (ent.code === "Enter") {
    buttonElement.click();
    inputNameElement.value = '';
    textareaElement.value = '';
  }
});





