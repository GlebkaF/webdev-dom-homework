const buttonElement = document.querySelector('button.add-form-button');

const listElement = document.querySelector('.comments');

const inputNameElement = document.querySelector('.add-form-name');

const textareaElement = document.querySelector('.add-form-text');



const myDate = new Date();
const options = {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  timezone: "UTC",
  hour: "numeric",
  minute: "2-digit"
};

options.hour = "2-digit";
const date = myDate.toLocaleDateString("ru-Ru", options).split(', ').join(' ');

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


// const comments = [
//   {
//     name: 'Глеб Фокин',
//     date: '12.02.22 12:18',
//     comment: 'Это будет первый комментарий на этой странице',
//     likesCounter: 3,
//     isLike: false,
//   },
//   {
//     name: 'Варвара Н.',
//     date: '13.02.22 19:22',
//     comment: 'Мне нравится как оформлена эта страница! ❤',
//     likesCounter: 75,
//     isLike: true,
//   },
// ];

// const renderComments = () => {
//   const commentHtml = comments.map((comment, index) => {
//     return `<li class="comment">
// <div class="comment-header">
//   <div>${comment.name}</div>
//   <div>${comment.date}</div>
// </div>
// <div class="comment-body">
//   <div class="comment-text" data-index='${index}' data-name='${comment.name}' data-comment='${comment.comment}'>
//     ${comment.comment}
//   </div>
// </div>
// <div class="comment-footer">
//   <div class="likes">
//     <span class="likes-counter">${comment.likesCounter}</span>
//     <button class="${comment.isLike ? "like-button -active-like" : "like-button"}" data-index='${index}'></button>
//   </div>
// </div>
// </li>`
//   }).join('');

//   listElement.innerHTML = commentHtml;

//   initChangeLikeButtonListeners();
//   answerToComment();
// }

const comments = [
  {
    name: 'Глеб Фокин',
    date: '12.02.22 12:18',
    comment: 'Это будет первый комментарий на этой странице',
    likesCounter: 3,
    isLike: false,
    isEdit: false,
  },
  {
    name: 'Варвара Н.',
    date: '13.02.22 19:22',
    comment: 'Мне нравится как оформлена эта страница! ❤',
    likesCounter: 75,
    isLike: true,
    isEdit: false,
  },
];

//рендер функция

const renderComments = () => {
  const commentHtml = comments.map((comment, index) => {
    return `<li class="comment">
<div class="comment-header">
  <div>${comment.name}</div>
  <div>${comment.date}</div>
</div>
<div class="comment-body">

${comments[index].isEdit ? `<textarea class= "edit-area-text">${comment.comment}</textarea>` : `<div class="comment-text" data-index='${index}' data-name='${comment.name}' data-comment='${comment.comment}'>${comment.comment}</div>`}
  
</div>
<div class="comment-footer">
  <div class="likes">
    <span class="likes-counter">${comment.likesCounter}</span>
    <button class="${comments[index].isLike ? "like-button -active-like" : "like-button"}" data-index='${index}'></button>
    ${comments[index].isEdit ? `<button class="save-button button-comment" data-index='${index}'>Сохранить</button>` : `<button class="edit-button button-comment" data-index='${index}'>Редактировать</button>`}
    <button class = "delete-button button-comment" data-index='${index}'>Удалить комментарий</button>
  </div>
</div>
</li>`
  }).join('');

  listElement.innerHTML = commentHtml;

  initChangeLikeButtonListeners();
  initEditButtonListeners();
  deleteComment();
  answerToComment();
}

//редактировать комментарии

const initEditButtonListeners = () => {
  const editButtons = document.querySelectorAll(".edit-button");
  for (const editButton of editButtons) {
    editButton.addEventListener('click', () => {

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
    saveButton.addEventListener('click', () => {
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


const initChangeLikeButtonListeners = () => {
  const likeButtonElements = document.querySelectorAll('.like-button');
  //console.log(likeButtonElements)

  for (const likeButtonElement of likeButtonElements) {
    likeButtonElement.addEventListener('click', () => {
      const index = likeButtonElement.dataset.index;

      // console.log(likeButtonElement);

      if (comments[index].isLike === false) {
        comments[index].likesCounter += 1;
        comments[index].isLike = true;


      } else {
        comments[index].likesCounter -= 1;
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
      event.stopPropagation(commentTexts);
      const userName = commentText.dataset.name;
      const userComment = commentText.dataset.comment;
      // const index = el.dataset.index;
      textareaElement.value = `>${userComment} \n${userName}`;
      renderComments();
    })
  }
}

answerToComment();

//удаление комментария по отдельности

const deleteComment = () => {
  const deleteButtonElements = document.querySelectorAll('.delete-button');
  for (const deleteButtonElement of deleteButtonElements) {
    deleteButtonElement.addEventListener('click', () => {
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
  console.log(deleteLastButtonElement)
  deleteLastButtonElement.addEventListener('click', () => {
    comments.pop();
    renderComments();
  });
};

deleteLastComment();

renderComments();


//обезопасить ввод данных пользователя

const secureInput = (safeText) => {
  return safeText
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
  //.replaceAll("&", "&amp;")
  //.replaceAll('"', "&quot;");
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

  comments.push({
    name: secureInput(inputNameElement.value),//функция безопасного ввода
    date: date,
    comment: secureInput(textareaElement.value),//функция безопасного ввода
    likesCounter: 0,
    isLike: false,
  })

  renderComments();

  inputNameElement.value = '';
  textareaElement.value = '';



  // inputNameElement.disabled = true;
  // textareaElement.disabled = true;

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





