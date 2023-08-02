"use strict";
const button = document.querySelector('.add-form-button');
const buttonTwo = document.querySelector('.add-form-button-two');
const list = document.querySelector('.comments');
const inputName = document.querySelector('.add-form-name');
const inputComments = document.querySelector('.add-form-text');
const arrayOfComments = [
  {
    name: 'Глеб Фокин',
    time: '12.02.22 12:18',
    comment: 'Это будет первый комментарий на этой странице',
    likes: 3,
    islover: false,
    isEdit: true,
  },

  {
    name: 'Варвара Н.',
    time: '13.02.22 19:22',
    comment: 'Мне нравится как оформлена эта страница! ❤',
    likes: 75,
    islover: false,
    isEdit: true,
  }
];

// Функция отображения корректного времени в комментариях
const currentDate = (data) => {

  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  let day = data.getDate();
  let month = months[data.getMonth()];
  let year = data.getFullYear();
  let hour = data.getHours() < 10 ? '0' + data.getHours() : data.getHours();
  let minuts = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes();
  let conclusion = `${day}.${month}.${year} ${hour}:${minuts}`;
  return conclusion;
}


// Функция валидация
const disablingButton = () => {
  if (inputName.value && inputComments.value) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }

}

// Функция счетчик лайков
const addingLikes = () => {

  const buttonElemets = document.querySelectorAll('.like-button');

  for (const buttonElemet of buttonElemets) {
    const index = buttonElemet.dataset.index;
    buttonElemet.addEventListener('click', (event) => {
      event.stopPropagation();

      if (arrayOfComments[index].islover) {
        arrayOfComments[index].likes -= 1
        arrayOfComments[index].islover = false;
      } else {
        arrayOfComments[index].likes += 1
        arrayOfComments[index].islover = true;
      }
      renderChangingMarkup();
    })
  }

}

// Функция ответа на комментария
const commentЕditor = () => {

  const commentBodyElements = document.querySelectorAll('.comment');

  for (const commentBodyElement of commentBodyElements) {

    commentBodyElement.addEventListener('click', () => {


      const index = commentBodyElement.dataset.delete

      inputComments.value = `${arrayOfComments[index].comment + ' ' + arrayOfComments[index].name + ':'}`;

    })

  }

}

// Функция редоктирования комментария
const changesComments = () => {

  const buttonEditors = document.querySelectorAll('.add-form-button-three');


  for (const buttonEditor of buttonEditors) {

    buttonEditor.addEventListener('click', (event) => {
      event.stopPropagation();

      const index = buttonEditor.dataset.edit

      if (arrayOfComments[index].isEdit) {
        arrayOfComments[index].comment
        arrayOfComments[index].isEdit = false

      } else if (arrayOfComments[index].isEdit === false) {
        arrayOfComments[index].isEdit = true
      }

      renderChangingMarkup();
    })

  }
}



// Функция добовления комментария на кнопку Enter
const enterInput = () => {
  document.addEventListener('keyup', event => {
    if (event.key === 'Enter')
      document.querySelector('.add-form-row .add-form-button').click();
  })
};


const changeText = () => {


}

// Функция рендер добовления в разметку
const renderChangingMarkup = () => {

  const arrayCommentsHtml = arrayOfComments.map((item, index) => {

    return `<ul class="comments">
    <li class="comment" data-delete="${index}">
      <div class="comment-header">
        <div>${item.name}</div>
        <div>${item.time}</div>
      </div>
      <div class="comment-body" data-edit="${index}">
      ${item.isEdit
        ? `<div class="comment-text data-div=${index}">
        ${item.comment}
      </div>`
        : `<textarea type="textarea" class='add-form-text' rows="4">${item.comment}</textarea>`
      }
      </div>
      <button data-edit="${index}" class="add-form-button-three ">${item.isEdit ? 'Редактировать' : 'Сохранить'}</button>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${item.likes}</span>
          <button class="like-button ${item.islover ? '-active-like' : ''}" data-index="${index}"></button>
        </div>
      </div>
    </li>
  </ul>`
  }).join('');
  list.innerHTML = arrayCommentsHtml;
  disablingButton();
  addingLikes();
  enterInput();
  commentЕditor();
  changesComments();

}
renderChangingMarkup();



// Обработчик клика на кнопку написать комментарий
button.addEventListener('click', () => {

  inputName.classList.remove('error')
  if (inputName.value === '') {
    inputName.classList.add('error')
  }
  inputComments.classList.remove('error')
  if (inputComments.value === '') {
    inputComments.classList.add('error')
    return;
  }

  // Метод добавления для в новый комментарий в списке
  arrayOfComments.push(
    {
      name: inputName.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      comment: inputComments.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      time: currentDate(new Date()),
      likes: 0,
      islover: false,
      isEdit: true,
    }
  )
