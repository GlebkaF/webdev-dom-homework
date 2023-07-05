"use strict";
const buttonElement = document.getElementById('write-button');
const nameElement = document.getElementById('name-input');
const commentElement = document.getElementById('comment-input');
const listElement = document.getElementById('comment-list');
const cancelElement = document.getElementById('cancel-button');

let comments = [];

const loadElement = document.querySelector('.load-text');
console.log(loadElement);

//Берем комментарии из API
const getTodo = (showLoading = true) => {
  nameElement.disabled = true;
  commentElement.disabled = true;

  if (showLoading) {
    loadElement.textContent = 'Подождите, комментарии загружаются...';
  } else {
    loadElement.textContent = '';
  };
  
return fetch('https://wedev-api.sky.pro/api/v1/AnnaIllarionova/comments', {
  method: "GET"
})
.then((answer) => {
  return answer.json();
}).then((answerData) => {
    //Преобразовываем данные из формата API в формат ленты
    const appComments = answerData.comments.map((comment) => {
      const apiDate = new Date(comment.date);
      let day = apiDate.getDate();
      let month = apiDate.getMonth() + 1;
      let year = apiDate.getFullYear();
      let hour = apiDate.getHours();
      let minutes= apiDate.getMinutes();
      if (day < 10 ) {
        day = '0' + day;
      }
      if (month < 10 ) {
        month = '0' + month;
      }
      if (hour < 10 ) {
        hour = '0' + hour;
      }
      if (minutes < 10 ) {
        minutes = '0' + minutes;
      }
      const userDate = day + '.' + month + '.' + year + ' ' + hour + ':' + minutes
      return {
      name: comment.author.name,
      date: userDate,
      text: comment.text,
      counter: comment.likes,
      isLiked: false,
      isEdit: false,
      };
    });
    comments = appComments;
    renderComments();
  })
  .then((data) => {
    nameElement.disabled = false;
    commentElement.disabled = false;
    loadElement.textContent = '';
  })
};




let currentDate = new Date();
let day = currentDate.getDate();
let month = currentDate.getMonth() + 1;
let year = currentDate.getFullYear();
let hour = currentDate.getHours();
let minutes= currentDate.getMinutes();

if (day < 10 ) {
  day = '0' + day;
}
if (month < 10 ) {
  month = '0' + month;
}
if (hour < 10 ) {
  hour = '0' + hour;
}
if (minutes < 10 ) {
  minutes = '0' + minutes;
}

//Исправление комментария 
const getCorrectComments = () => {
  const correctButtons = document.querySelectorAll('.add-correct-button');

  for (const correctButton of correctButtons) {
    
    correctButton.addEventListener('click', (event) => {
     event.stopPropagation();
        const correctIndex = parseInt(correctButton.dataset.index);
        //console.log(correctIndex);
  
        const comment = comments[correctIndex];
      

      if (!comment.isEdit) {
        correctButton.innerHTML = 'Сохранить'; 
        comment.isEdit = true;
        comment.text = comment.text;

      } else {
        correctButton.innerHTML = 'Редактировать';
        comment.isEdit = false;
        const newCommentText = document.getElementById('correct-textarea');
        comment.text = newCommentText.value;   

      }
    
      console.log('paботает!');
      renderComments();
    });
  }
 
};

//Функция для имитации запросов в API для кнопки лайка
function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

// Добавление лайка
const getLikes = () => {
    const likeButtons = document.querySelectorAll('.like-button');

    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
          event.stopPropagation();
          likeButton.style.animation = 'rotating 2s linear infinite';
                      
        const commentIndex = parseInt(likeButton.dataset.index);
       // console.log(commentIndex);
        const comment = comments[commentIndex];

        delay(2000).then(() => {
          comment.likes = comment.isLiked
          if (!comment.isLiked) {
            comment.counter += 1;
            comment.isLiked = true;
  
          } else {
            comment.counter -= 1;
            comment.isLiked = false
          }
          renderComments();
        });

        });
    }

}

//Ренден функция
const renderComments = () => {
    let commentsHTML = comments.map((comment, index) => {
        return ` <li id="comment-list" class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.isEdit ? `<textarea
          id="correct-textarea"
          type="textarea"
          class="add-form-text"
          rows="4"
        >${comment.text}</textarea>` : `${comment.text}` }
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.counter}</span>
          <button data-index="${index}" 
          class="like-button${comment.isLiked ? " -active-like" : ""}">
          </button>
        </div>
      </div>
      <div class="add-form-row">
          <button data-index="${index}" class="add-correct-button">${comment.isEdit ? 'Сохранить' : 'Редактировать'}</button>
        </div>
    </li>`
    }).join('');

    listElement.innerHTML = commentsHTML;

    

  // Клик на комментарий, ответ на комментарий
  const commentItems = document.querySelectorAll('.comment');
  
  for (const commentItem of commentItems) {
    commentItem.addEventListener('click', () => {
      const index = commentItem.dataset.index;
      //console.log(index);
      const comment = comments[index];
      commentElement.value = `${comment.text}\n${comment.name}`;
    })
    
  }
    
    checkFields();
    getLikes();
    getCorrectComments();

}

//Если поля не заполнены, кнопка не активна

function checkFields() {

  if (nameElement.value && commentElement.value) {
    buttonElement.disabled = false;
  } else {
    buttonElement.disabled = true;
  }
  
}
nameElement.addEventListener('input', checkFields);
commentElement.addEventListener('input', checkFields);

const commentBodyElement = document.querySelector('.comment-body');
const loadBodyElement = document.querySelector('.comment-body-text');
console.log(loadBodyElement);

//Добавляет комментарий, функция с цепочкой промиссов
const addTodo = () => {
  // buttonElement.disabled = true;
  // buttonElement.textContent = 'Загружаем комментарий...';

  commentBodyElement.style.display = 'none';
  loadBodyElement.textContent = 'Загружаем комментарий...';

  return fetch('https://wedev-api.sky.pro/api/v1/AnnaIllarionova/comments', {
  method: "POST",
  body: JSON.stringify({
    text: commentElement.value
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;"),
    name: nameElement.value
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;"),
    date: day + '.' + month + '.' + year + ' ' + hour + ':' + minutes,
    counter: 0,
    isLiked: false,
    isEdit: false,
  })
})
.then((response) => {
  return response.json()
}) 
  .then((responseData) => {
    return getTodo(false);
  })
  .then((data) => {
    // buttonElement.disabled = false;
    // buttonElement.textContent = 'Написать';

    commentBodyElement.style.display = '';
    loadBodyElement.textContent = '';
    
  })
};

//Поля ввода подкрашиваются красным, если одно из полей не заполнено
//Добавляем новый комментарий 
buttonElement.addEventListener('click', () => {

  nameElement.classList.remove('error');
  commentElement.classList.remove('error');

  if (nameElement.value === '' || commentElement.value === '') {
    nameElement.classList.add('error');
    commentElement.classList.add('error');
    alert('Заполните оба поля (имя и комментарий)!');
    return;
  }    

  addTodo()
  .then((data) => {
    renderComments();
  });

  //     После нажатия на кнопку поля становятся пустыми, кнопка не активна.
  nameElement.value = '';
  commentElement.value = '';
  buttonElement.disabled = true;
});

//Комментарий добавляется при нажатии на Enter
commentElement.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {

    renderComments();
  }
})


//Удалить последний комментарий
cancelElement.addEventListener('click', () => {
  const lastElementIndex = listElement.innerHTML.lastIndexOf('<li id="comment-list" class="comment">');
  if (lastElementIndex !== -1) {
    const allComments = listElement.querySelectorAll('.comment');
    const lastElement = allComments[allComments.length - 1];
    lastElement.remove();
  }
});



console.log("It works!");
getTodo();
renderComments();