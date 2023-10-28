// "use strict";
let isLoading = false;

document.querySelector('.container').style.display = "none";

//Нашла форму добавления комментариев
const formAddComm = document.querySelector('.add-form');

//рендер формы для написания комментария
const renderForm = () => {
  if (isLoading === true) {
    // console.log(isLoading);
    formAddComm.innerHTML =
      ` <div>Комментарий добавляется </div>
    `
  } else {
    // console.log(isLoading);
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
</div>`;
    addCommentsListener();
  }
}
renderForm();

// Функция для имитации запросов в API
// Не смотрите особо на внутренности, мы разберемся с этим позже
function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

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
      //функция для проверки на состояние загрузки и присваивание класса с анимацией
      const loadingLike = () => {
        if (isLikeLoading) {
          return likeButton.classList.add('-loading-like');
        } else {
          return likeButton.classList.remove('-loading-like');
        }
      }
      //состояние загрузки
      let isLikeLoading = true;
      loadingLike();
      //Присвоила индексу весь элемент массива
      const index = likeButton.dataset.index;
      delay(2000).then(() => {
        if (comments[index].isLike) {
          comments[index].isLike = false;
          comments[index].likes -= 1;
        } else {
          comments[index].isLike = true;
          comments[index].likes += 1;
        }

      })
        .then(() => {
          isLikeLoading = false;
          return loadingLike();
        })
        .then(() => {
          return renderComments();
        });
    });
  }
}

//Отслеживает инпуты
const isActive = () => {
  if (document.querySelector('.add-form-name').value !== '' && document.querySelector('.add-form-text').value !== '') {
    writeButton.disabled = false;
    writeButton.style.backgroundColor = '#bcec30';
  }
}

document.querySelector('.add-form-name').addEventListener('input', isActive);
document.querySelector('.add-form-text').addEventListener('input', isActive);

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
  const datePublish = new Date(dateString); //создание времени
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
function renderComments() {
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
  return fetch('https://wedev-api.sky.pro/api/v1/ulyana-lazutina/comments', {
    method: 'GET',
  })
    .then((response) => {
      document.querySelector('.loader').style.display = "none";
      document.querySelector('.container').style.display = "flex";
      return response.json()
    })
    .then((responseData) => {
      comments = responseData.comments;
      return renderComments();
    });
}

getComments();

//Добавляет обработчик на кнопку Написать
function addCommentsListener() {
  document.querySelector('.add-form-button')
    .addEventListener('click', addComments)
}

//Функция добавления комментария
function addComments() {
  //Нашла два инпута
  const nameInputElement = document.querySelector('.add-form-name');
  const commentInputElement = document.querySelector('.add-form-text');
  isLoading = true;
  renderForm();
  getComments();
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
  }).
    then((response) => {
      return response.json()
    })
    .then((responseData) => {
      comments = responseData.comments;
      return getComments();
    })
    .then((data) => {
      isLoading = false;
      return renderForm();
    })

  nameInputElement.value = '';
  commentInputElement.value = '';
  writeButton.disabled = true;
  writeButton.style.backgroundColor = 'grey';

}

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