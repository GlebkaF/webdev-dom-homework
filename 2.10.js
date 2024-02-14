"use strict";
const addButtonElement = document.getElementById('add-button');
const listElement = document.getElementById('list');
const nameInputElement = document.getElementById('name-input');
const commentInputElement = document.getElementById('comment-input');

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

  const oldListHtml = listElement.innerHTML;
  listElement.innerHTML = oldListHtml +
    `<li class="comment">
      <div class="comment-header">
        <div>${nameInputElement.value}</div>
        <div>${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${commentInputElement.value}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">0</span>
          <button class="like-button"></button>
        </div>
      </div>
    </li>`;

  nameInputElement.value = '';
  commentInputElement.value = '';
});



document.addEventListener('click', (event) => {
    
    if (event.target.classList.contains('like-button')) {
      
      const likesContainer = event.target.closest('.likes');
      
      const likesCounter = likesContainer.querySelector('.likes-counter');
      
    
      let currentLikes = parseInt(likesCounter.textContent);
      
      
      if (event.target.classList.contains('-active-like')) {
        currentLikes--;

        event.target.classList.remove('-active-like');
      } else {
        
        currentLikes++;
        event.target.classList.add('-active-like');
      }
      
      likesCounter.textContent = currentLikes;
    }
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