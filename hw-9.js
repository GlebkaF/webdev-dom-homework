// "use strict";
//Нашла два инпута
const nameInputElement = document.querySelector('.add-form-name');
const commentInputElement = document.querySelector('.add-form-text');

//Нашла блок с комментариями и сами комментарии
const blockComments = document.querySelector('.comments');


//Нашла кнопку написать и отключила ее
const writeButton = document.querySelector('.add-form-button');
writeButton.disabled = true;
writeButton.style.backgroundColor = 'grey';

//Нашла форму добавления комментариев
const formAddComm = document.querySelector('.add-form');

//Нашла кнопку удаления
const deleteButton = document.querySelector('.remove-button');



//массив с комментариями
const comments = [
  {
    name: 'Глеб Фокин',
    textComment: 'Это будет первый комментарий на этой странице',
    isEdit: false,
    date: '12.02.22 12:18',
    isLike: true,
    countLike: 3,
  },
  {
    name: 'Варварва Н.',
    textComment: 'Мне нравится как оформлена эта страница! ❤',
    isEdit: false,
    date: '13.02.22 19:22',
    isLike: false,
    countLike: 75,
  },
];
//Отслеживает лайки
const initLikeButtonsListener = () => {
  //Нашла кнопку лайка
  const likeButtons = document.querySelectorAll('.like-button');
  //Перебираю все кнопки 
  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      //Присвоила индексу весь элемент массива
      const index = likeButton.dataset.index;
      if (comments[index].isLike) {
        comments[index].isLike = false;
        comments[index].countLike -= 1;
      } else {
        comments[index].isLike = true;
        comments[index].countLike += 1;
      }
      renderComments();
    });
  }
}


//Отслеживает инпуты
const isActive = () => {
  if (nameInputElement.value !== '' && commentInputElement.value !== '') {
    writeButton.disabled = false;
    writeButton.style.backgroundColor = '#bcec30';
  }
}

nameInputElement.addEventListener('input', isActive);
commentInputElement.addEventListener('input', isActive);

//Изменение комментария
const initUpdateButtonsListener = () => {
  const updateButtons = document.querySelectorAll('.update-btn');
  for (const updateButton of updateButtons) {
    updateButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const index = updateButton.dataset.index;
      comments[index].isEdit = true;
      renderComments();
    })
  }
}

//Сохранение измененного комментария
const initSaveButtonsListeners = () => {
  const saveButtons = document.querySelectorAll('.save-btn');
  const updateInputValue = document.querySelector('.update-input');
  for (const saveButton of saveButtons) {
    saveButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const index = saveButton.dataset.index;
      comments[index].textComment = updateInputValue.value;
      comments[index].isEdit = false;
      renderComments();
    })
  }

}

//ответ на комментарий
const initUpdateCommentListener = () => {
  const formComments = document.querySelectorAll('.comment');
  for (const formComment of formComments) {
    formComment.addEventListener('click', () => {
      const index = formComment.dataset.index;
      nameInputElement.value = '';
      commentInputElement.value = `%BEGIN_QUOTE ${comments[index].name}: 
      ${comments[index].textComment}END_QUOTE%`;
    })
  }
}


//Рендерит комментарии
const renderComments = () => {
  blockComments.innerHTML = comments.map((comment, index) => {
    return `
        <li class="comment" data-index='${index}'>
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
        ${comment.isEdit ? `<textarea class="update-input">${comment.textComment}</textarea>` : `<div>${comment.textComment}</div>`}
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.countLike}</span>
            <button data-index='${index}' class="${comment.isLike ? 'like-button -active-like' : 'like-button'}"></button> 
          </div>
        </div>
        <button data-index='${index}' type="button" class= ${comment.isEdit ? '"save-btn"> Сохранить </button>' : '"update-btn">Редактировать</button>'}
      </li>
        `
  }).join('');


  initLikeButtonsListener();
  initUpdateButtonsListener();
  initSaveButtonsListeners();
  initUpdateCommentListener();
}
renderComments();





//Функция добавления комментария
const addComments = () => {
  //Работа со временем
  const datePublish = new Date(); //создание времени
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']; //Правильная расстановка месяцей
  let dayPublish = datePublish.getDate(); //Получение дня
  let monthPublish = months[datePublish.getMonth()]; //Получение месяца
  let yearPublish = datePublish.getFullYear().toString().slice(-2); //Получение года
  let hoursPublish = datePublish.getHours(); //Получение часов
  let minutesPublish = datePublish.getMinutes(); //Получение минус
  //Проверки на нули для красоты
  if (dayPublish < 10) {
    dayPublish = '0' + dayPublish;
  }
  if (hoursPublish < 10) {
    hoursPublish = '0' + hoursPublish;
  }
  if (minutesPublish < 10) {
    minutesPublish = '0' + minutesPublish;
  }
  //Передача всех параметров в одну переменную
  const newFormatDatePublish = `${dayPublish}.${monthPublish}.${yearPublish} ${hoursPublish}:${minutesPublish}`;
  //Добавление в массив новые комменатарии
  comments.push({
    name: nameInputElement.value
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;'),
    textComment: commentInputElement.value
    .replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll("%BEGIN_QUOTE", "<div class='quote'>")
    .replaceAll("END_QUOTE%", "</div>"),
    date: newFormatDatePublish,
    isEdit: false,
    isLike: false,
    countLike: 0,
  });

  renderComments();
  nameInputElement.value = '';
  commentInputElement.value = '';
  writeButton.disabled = true;
  writeButton.style.backgroundColor = 'grey';
}

//При нажатии на кнопку "Написать" добавляется новый комментрий
writeButton.addEventListener('click', addComments)

//При нажатии на энтер добавляется новый комментарий
formAddComm.addEventListener('keyup', (elem) => {
  if (elem.keyCode === 13) {
    addComments();
  }
})

// //Удаление последнего комментария
deleteButton.addEventListener('click', () => {
  comments.splice(-1);
  renderComments();
})
