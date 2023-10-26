// "use strict";
let isLoading = false;

//Нашла форму добавления комментариев
const formAddComm = document.querySelector('.add-form');
const renderForm = () => {
  if (isLoading === true) {
    console.log(isLoading);
    formAddComm.innerHTML =
      ` <div>Комменатрий добавляется </div>
    `
  } else {
    console.log(isLoading);
    formAddComm.innerHTML = ` <input
    type="text"
    class="add-form-name"
    placeholder="Введите ваше имя"
  />
  <textarea
    type="textarea"
    class="add-form-text"
    placeholder="Введите ваш коментарий"
    rows="4"
  ></textarea>
  <div class="add-form-row">
    <button class="add-form-button">Написать</button>
  </div>
</div>`
  }
}
renderForm();

//Нашла два инпута
const nameInputElement = document.querySelector('.add-form-name');
const commentInputElement = document.querySelector('.add-form-text');

//Нашла блок с комментариями и сами комментарии
const blockComments = document.querySelector('.comments');


//Нашла кнопку написать и отключила ее
const writeButton = document.querySelector('.add-form-button');
writeButton.disabled = true;
writeButton.style.backgroundColor = 'grey';



//Нашла кнопку удаления
const deleteButton = document.querySelector('.remove-button');



//массив с комментариями
let comments = [];
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
        comments[index].likes -= 1;
      } else {
        comments[index].isLike = true;
        comments[index].likes += 1;
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

//функция для работы со временем
const formatDate = (dateString) => {
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
  return `${dayPublish}.${monthPublish}.${yearPublish} ${hoursPublish}:${minutesPublish}`;
}

//Рендерит комментарии
const renderComments = () => {
  blockComments.innerHTML = comments.map((comment, index) => {
    return `
        <li class="comment" data-index='${index}'>
        <div class="comment-header">
          <div>${comment.author.name}</div>
          <div>${formatDate(comment.date)}</div>
        </div>
        <div class="comment-body">
        ${comment.isEdit ? `<textarea class="update-input">${comment.text}</textarea>` : `<div>${comment.text}</div>`}
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
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

//Получение комментариев из Апи
const getComments = () => {
  fetch('https://wedev-api.sky.pro/api/v1/ulyana-lazutina/comments', {
    method: 'GET',
  }).then((response) => {
    response.json().then((responseData) => {
      comments = responseData.comments;
      renderComments();
    })
  });
}
getComments();

//Функция добавления комментария
const addComments = () => {
  isLoading = true;
  renderForm();
  //Добавление в массив новые комменатарии
  fetch('https://wedev-api.sky.pro/api/v1/ulyana-lazutina/comments', {
    method: 'POST',
    body: JSON.stringify({
      "text": commentInputElement.value
        .replaceAll('<', '&lt;').replaceAll('>', '&gt;')
        .replaceAll("%BEGIN_QUOTE", "<div class='quote'>")
        .replaceAll("END_QUOTE%", "</div>"),
      "name": nameInputElement.value
    }),
  }).then((response) => {
    response.json().then((responseData) => {
      comments = responseData.comments;
      getComments();
    })
  })

  nameInputElement.value = '';
  commentInputElement.value = '';
  writeButton.disabled = true;
  writeButton.style.backgroundColor = 'grey';
  isLoading = false;
  renderForm();
}


//При нажатии на кнопку "Написать" добавляется новый комментрий
writeButton.addEventListener('click', addComments)

//При нажатии на энтер добавляется новый комментарий
formAddComm.addEventListener('keyup', (elem) => {
  if (elem.keyCode === 13) {
    addComments();
  }
})

//Удаление последнего комментария
deleteButton.addEventListener('click', () => {
  comments.splice(-1);
  renderComments();
})
