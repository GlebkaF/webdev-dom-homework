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
    likeButton.addEventListener('click', () => {
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

// const initSaveButtonsListener = () => {
//   const saveButton = document.querySelector('.save-btn');
//   const updateElements = document.querySelector('.update-form-text');
//   saveButton.addEventListener('click', () => {
//     const index = saveButton.dataset.index;
//     comments[index].textComment = updateElements.value;
//     console.log(comments[index]);

//   })
//   console.log(saveButton);
// }

// const initUpdateButtonsListener = () => {
//   const commentElements = document.querySelectorAll('.comment');
//   const updateButtons = document.querySelectorAll('.update-btn');
//   for (const updateButton of updateButtons) {
//     const index = updateButton.dataset.index;
//     updateButton.addEventListener('click', () => {
//       commentElements[index].innerHTML = `
//       <div class="comment-header">
//           <div></div>
//           <div>13.02.22 19:22</div>
//         </div>
//         <div class="comment-body">
//         <textarea
//         type="textarea"
//         class="update-form-text"
//         placeholder="Введите ваш коментарий"
//         rows="4"
//       >
//       Мне нравится как оформлена эта страница! ❤
//       </textarea>   
//         </div>
//         <div class="comment-footer">
//           <div class="likes">
//             <span class="likes-counter">75</span>
//             <button data-index="1" class="like-button"></button>
//             <button data-index="1" type="button" class="save-btn">Сохранить</button>
//             </div>
//         </div>
//       `
//       console.log(commentElements[index].innerHTML);
//       save();
//     })

//   }
// }

//Рендерит комментарии
const renderComments = () => {
  blockComments.innerHTML = comments.map((comment, index) => {
    return `
        <li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
          ${comment.textComment}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.countLike}</span>
            <button data-index='${index}' class="${comment.isLike ? 'like-button -active-like' : 'like-button'}"></button>
            <button data-index='${index}' type="button" class="update-btn">Редактировать</button>
            </div>
        </div>
      </li>
        `
  }).join('');


  initLikeButtonsListener();
  // initUpdateButtonsListener();
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

  //Добавление в массив новые комменатрии
  comments.push({
    name: nameInputElement.value,
    textComment: commentInputElement.value,
    date: newFormatDatePublish,
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
  const lastCom = comments.at(-1);
  comments.splice(lastCom, 1);
  renderComments();
})
