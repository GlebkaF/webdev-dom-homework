"use strict";
const addButtonElement = document.getElementById('add-button');
const listElement = document.getElementById('list');
const nameInputElement = document.getElementById('name-input');
const commentInputElement = document.getElementById('comment-input');


const comments = [
  {
    name: 'Глеб Фокин',
    day: 12,
    month: 2,
    year: 22,
    hours: 12,
    minutes: 18,
    comment: 'Это будет первый комментарий на этой странице',
    likesCounter: 75,
    likeButton: true,
  },

  {
    name: 'Варвара Н.',
    day: 13,
    month: 2,
    year: 22,
    hours: 19,
    minutes: 22,
    comment: 'Мне нравится как оформлена эта страница! ❤',
    likesCounter: 3,
    likeButton: false,
  },
];

const renderComments = () => {
  const commentsHtml = comments.map((comment, index)=> {
  return `<li class="comment">
  <div class="comment-header">
    <div>${comment.name}</div>
    <div>${comment.day}.${comment.month}.${comment.year} ${comment.hours}:${comment.minutes}</div>
  </div>
  <div class="comment-body">
    <div class="comment-text">
      ${comment.comment}
    </div>
  </div>
  <div class="comment-footer">
    <div class="likes">
      <span id="likes" class="likes-counter">${comment.likesCounter}</span>
      <button id="button-like" data-index="${index}" class="like-button ${comment.likeButton ? '-active-like' : ''}"></button>
    </div>
  </div>
  </li>`
  }).join('');
  listElement.innerHTML = commentsHtml;
};

renderComments()



const counterLikesElements = document.querySelectorAll('.likes-counter');
const addLikesButtonsElements = document.querySelectorAll('.like-button');

for (const addLikesButtonsElement of addLikesButtonsElements ) {
  addLikesButtonsElement.addEventListener('click', () => {
    
    if (addLikesButtonsElement.dataset.index === true) {
      addLikesButtonsElement.dataset.index = false;
      comment.likesCounter--;
    } else {
      addLikesButtonsElement.dataset.index === false;
      comment.likesCounter++;
    }
  });
};



addButtonElement.addEventListener('click', () => {
  nameInputElement.classList.remove('error');
  commentInputElement.classList.remove('error');

  if (nameInputElement.value.trim() === '' || commentInputElement.value.trim() === '') {
    nameInputElement.classList.add('error');
    commentInputElement.classList.add('error');
    return;
  };

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear().toString().slice(-2);
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  comments.push({
    name: nameInputElement.value,
    day: formattedDay,
    month: formattedMonth,
    year: year,
    hours: formattedHours,
    minutes: formattedMinutes,
    comment: commentInputElement.value,
    likesCounter: 0,
    likeButton: false,
  });


  renderComments();
  
  nameInputElement.value = '';
  commentInputElement.value = '';
});

  












































// // Доп задание

  // nameInputElement.addEventListener('input', () => {
  //   if (nameInputElement.value === '' || commentInputElement.value === '') {
  //     addButtonElement.disabled = true;
  //     addButtonElement.style.backgroundColor = 'gray';
  //   } else {
  //     addButtonElement.disabled = false;
  //     addButtonElement.style.backgroundColor = '';
  //   }
  // });

  // commentInputElement.addEventListener('input', () => {
  //   if (nameInputElement.value === '' || commentInputElement.value === '') {
  //     addButtonElement.disabled = true;
  //     addButtonElement.style.backgroundColor = 'gray';
  //   } else {
  //     addButtonElement.disabled = false;
  //     addButtonElement.style.backgroundColor = '';
  //   }
  // });




  // // Доп задание 

  // commentInputElement.addEventListener('keyup', function (event) {
  //   if (event.key === 'Enter') {
  //     addComment();
  //   };
  // });
  // // Доп задание 

  // deleteButtonElement.addEventListener('click', () => {
  //   const lastCommentIndex = listElement.innerHTML.lastIndexOf('<li class="comment">');
  //   listElement.innerHTML = listElement.innerHTML.substring(0, lastCommentIndex);
  // }
  // );