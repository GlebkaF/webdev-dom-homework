"use strict";
const addButtonElement = document.getElementById('add-button');
const listElement = document.getElementById('list');
const nameInputElement = document.getElementById('name-input');
const commentInputElement = document.getElementById('comment-input');

fetch(
  'https://wedev-api.sky.pro/api/v1/rustam-kholov/comments',
  {
    method: "GET"
  }
).then((response) => {

  response.json().then((responseData)=> {

    const appComments = responseData.comments.map((comment) => {

      return {
        name: comment.author.name,
        date: new Date(comment.date),
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
      };
    });

    comments = appComments;

    console.log(comments);
    
    renderComments();
  });
});

let comments = [];

const renderComments = () => {
  const commentsHtml = comments.map((comment, index)=> {
  return `<li class="comment">
  <div class="comment-header">
    <div data-index="${index}">${comment.name}</div>
    <div>${comment.day}.${comment.month}.${comment.year} ${comment.hours}:${comment.minutes}</div>
  </div>
  <div class="comment-body">
    <div data-index="${index}" class="comment-text">
      ${comment.comment}
    </div>
  </div>
  <div class="comment-footer">
    <div class="likes">
      <span id="likes" class="likes-counter">${comment.likesCounter}</span>
      <button id="button-like" data-like="${comment.likesCounter}" data-index="${index}" class="like-button ${comments[index].isLiked ? '-active-like' : ''}"></button>
    </div>
  </div>
  </li>`
  }).join('');
  listElement.innerHTML = commentsHtml;

  initLikeButtonListeners();
  reply();
};



const initLikeButtonListeners = () => {
  const addLikesButtonsElements = document.querySelectorAll('.like-button');

  for (const addLikesButtonsElement of addLikesButtonsElements) {

    const index = addLikesButtonsElement.dataset.index;
    const counter = addLikesButtonsElement.dataset.like;

    addLikesButtonsElement.addEventListener('click', () => {

      if (comments[index].isLiked === false) {
        
        const result = Number(counter) + 1;
        comments[index].likesCounter = result;

        comments[index].isLiked = true;

      } else { 
        
        const result = Number(counter) - 1;
        comments[index].likesCounter = result;

        comments[index].isLiked = false;
      }

      renderComments();
    })
  }
};

renderComments();

function reply() {

  const commentElements = document.querySelectorAll('.comment-body');
  const formTextElement = document.querySelector('.add-form-text');

  commentElements.forEach((element, index) => {
    element.addEventListener('click', () => {
      formTextElement.value = `> ${comments[index].name} \n ${comments[index].comment}`;
    });
  });
}

reply();


function removeValidation() {

  nameInputElement.addEventListener('click', ()=> {
    nameInputElement.classList.remove('error')
  });
  
  commentInputElement.addEventListener('click', ()=> {
    commentInputElement.classList.remove('error')
  });
};

removeValidation();

addButtonElement.addEventListener('click', () => {
  nameInputElement.classList.remove('error');
  commentInputElement.classList.remove('error');

  if (nameInputElement.value.trim() === '' || commentInputElement.value.trim() === '') {
    nameInputElement.classList.add('error');
    commentInputElement.classList.add('error');
    return;
  };
  

  // const currentDate = new Date();
  // const day = currentDate.getDate();
  // const month = currentDate.getMonth() + 1;
  // const year = currentDate.getFullYear().toString().slice(-2);
  // const hours = currentDate.getHours();
  // const minutes = currentDate.getMinutes();

  // const formattedDay = day < 10 ? '0' + day : day;
  // const formattedMonth = month < 10 ? '0' + month : month;
  // const formattedHours = hours < 10 ? '0' + hours : hours;
  // const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  // comments.push({
  //   name: nameInputElement.value
  //   .replaceAll("&", "&amp;")
  //   .replaceAll("<", "&lt;")
  //   .replaceAll(">", "&gt;")
  //   .replaceAll('"', "&quot;"),
  //   day: formattedDay,
  //   month: formattedMonth,
  //   year: year,
  //   hours: formattedHours,
  //   minutes: formattedMinutes,
  //   comment: commentInputElement.value
  //   .replaceAll("&", "&amp;")
  //   .replaceAll("<", "&lt;")
  //   .replaceAll(">", "&gt;")
  //   .replaceAll('"', "&quot;"),
  //   likesCounter: 0,
  //   isLiked: false,
  // });

  fetch(
    'https://wedev-api.sky.pro/api/v1/rustam-kholov/comments',
    {
      method: "POST",
      body: JSON.stringify( {
        name: nameInputElement.value,
        text: commentInputElement.value,
      })
    }
  ).then((response) => {
  
    response.json().then((responseData)=> {
  
      const appComments = responseData.comments.map((comment) => {
  
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });
  
      comments = appComments;
      renderComments();
    });
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