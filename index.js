"use strict";

const comments = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        counter: 3,
        isLiked: 'true',
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        counter: 75,
        isLiked: 'false',  
    },
];
// Код писать здесь

const buttonElement = document.getElementById('write-button');
const nameElement = document.getElementById('name-input');
const commentElement = document.getElementById('comment-input');
const listElement = document.getElementById('comment-list');
const cancelElement = document.getElementById('cancel-button');

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

// Добавление лайка
const getLikes = () => {
    const likeButtons = document.querySelectorAll('.like-button');

    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', () => {
                      
        const commentIndex = parseInt(likeButton.dataset.index);
       // console.log(commentIndex);
        const comment = comments[commentIndex];

        if (comment.isLiked === 'false') {
          comment.counter += 1;
          comment.isLiked = 'true';

        } else {
          comment.counter -= 1;
          comment.isLiked = 'false';

        }      
            renderComments();
        });
    }

}

const renderComments = () => {
    const commentsHTML = comments.map((comment, index) => {
        return ` <li id="comment-list" class="comment">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.counter}</span>
          <button data-index="${index}" 
          class="like-button${comment.isLiked === 'true' ? " -active-like" : ""}">
          </button>
        </div>
      </div>
    </li>`
    }).join('');
    listElement.innerHTML = commentsHTML;

    
  //     После нажатия на кнопку поля становятся пустыми, кнопка не активна.
  nameElement.value = '';
  commentElement.value = '';
  buttonElement.disabled = true;
    
    checkFields();
    getLikes();

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

  comments.push({
    name: nameElement.value,
        date: day + '.' + month + '.' + year + ' ' + hour + ':' + minutes,
        text: commentElement.value,
        counter: 0,
        isLiked: 'false',
})

renderComments();

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
renderComments();