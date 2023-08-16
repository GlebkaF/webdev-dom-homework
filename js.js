const form = document.querySelector('.add-form');
const nameInputElement = document.querySelector('.add-form-name');
const textInputElement = document.querySelector('.add-form-text');
const buttonElement = document.querySelector('.add-form-button');
const commentsElement = document.querySelector('.comments');
const buttonElementDel = document.querySelector('.delete-form-button');
const arrayInputs = [nameInputElement, textInputElement];
const host = "https://wedev-api.sky.pro/api/v1/ala-sharova/comments";
const listElement = document.getElementById("list");
const commentsLoading = document.querySelector('.loader');
const commentLoading = document.querySelector('.loader_1');
let comments = [];


  
// Функция getAPI позволяет получать данные с сервера

const getAPI = () => {
    return fetch(host, {
    method: "GET",
  })
.then((response) => {
  return response.json();
})
.then((responseData) => {
  const appComments = responseData.comments.map((comment) => {
    return {
      name: comment.author.name,
      date: new Date(comment.date),
      text: comment.text,
      likes:comment.likes,
      isLiked: false,
      propertyColorLike: 'like-button -no-active-like',
    }
  })
comments = appComments;
  renderComments();
})
.then(() => {
  commentsLoading.style.display = 'none';
})
};

getAPI();

// Функция postAPI позволяет отправлять данные на сервер
const postAPI = (nameInputElement, textInputElement) => {
  form.style.display = 'none';
  commentLoading.style.display = 'flex';
  return fetch(host, {
    method: "POST", 
    body: JSON.stringify({
      text: textInputElement.value,
      name: nameInputElement.value
     }),
  })
.then((response) => {
  console.log("Время:"+ (Date.now()- startAt));
    return response.json()
  })
.then((responseData) => {
  console.log("Время:"+ (Date.now()- startAt));
      comments = responseData.todos;
      getAPI();
    })
.then(() => {
  nameInputElement.value = '';
  textInputElement.value = '';	
})
.then(() => {
  form.style.display = 'flex';
  commentLoading.style.display = 'none';

})
};	   


//счетчик лайков

function getLikeButton() {
  const likesButton = document.querySelectorAll('.like-button');
  for (const like of likesButton) {
    like.addEventListener("click", (event) => {
      const likeIndex = like.dataset.index;
      const commentsElement = comments[likeIndex];
      event.stopPropagation();
      if (commentsElement.isLiked) {
        commentsElement.likes -= 1;
        commentsElement.isLiked = false;
        commentsElement.propertyColorLike = 'like-button -no-active-like'; 
        renderComments();
      } else {
        commentsElement.likes += 1;
        commentsElement.isLiked = true;
        commentsElement.propertyColorLike = 'like-button -active-like';  
      }      
      renderComments();       
    });	      
  };   
};

getLikeButton()



// комментарий вводимый пользователем добавляем в массив

buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove('error');
  if(nameInputElement.value === "" || textInputElement === "") {
      textInputElement.classList.add('error');
      nameInputElement.classList.add('error');
      return;
  } 
  textInputElement.classList.remove('error');
  postAPI(nameInputElement, textInputElement);
});

// HTML код через JS
const renderComments = () => {
const commentsHtml = comments.map((comment, index) => {   
    const commentDate = new Date(comment.date);
    const timeDate = commentDate.toLocaleDateString() + ' ' +commentDate.getHours() + ':' + commentDate.getMinutes();
  return `<li class="comment">
  <div class="comment-header">
  <div>${comment.name}
        </div>
        <div class="date">${timeDate}</div>
      </div>
      <div class="comment-body">
        <div class="comments-text">
          ${comment.text}
        </div></div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter"> ${comment.likes}</span>
          <button class="like-button ${comment.propertyColorLike}" data-index="${index}"></button>
          </div>
      </div>
    </li>`;
  }).join("");
  
  commentsElement.innerHTML = commentsHtml;
  
  getLikeButton();  
  // replyComment();
  };
  
  renderComments();









// формат даты
const currentDate = new Date().getDate().toString().padStart(2, '0') + '.' +
  (new Date().getMonth() + 1).toString().padStart(2, '0') + '.' +
  new Date().getFullYear().toString().slice(-2) + " " +
  new Date().toLocaleTimeString().slice(0, -3);

console.log("It works!");


//  Код без API

// "use strict";
//   const form = document.querySelector('.add-form');
//   const nameInputElement = document.querySelector('.add-form-name');
//   const textInputElement = document.querySelector('.add-form-text');
//   const buttonElement = document.querySelector('.add-form-button');
//   const commentsElement = document.querySelector('.comments');
//   const buttonElementDel = document.querySelector('.delete-form-button');
//   const arrayInputs = [nameInputElement, textInputElement];
  



  


//   const comments = [
//     {
//       name: 'Глеб Фокин',
//       dateСreation: '12.02.22 12:18',
//       textComment: 'Это будет первый комментарий на этой страницe',
//       likeComment: false,
//       likesNumber: 3,
//       propertyColorLike: 'like-button -no-active-like',
//     },
//     {
//       name: 'Варвара Н.',
//       dateСreation: '13.02.22 19:22',
//       textComment: 'Мне нравится как оформлена эта страница! ❤',
//       likeComment: false,
//       likesNumber: 75,
//       propertyColorLike: 'like-button -no-active-like',
//     },
//   ];


// //счетчик лайков

// function getLikeButton() {    
//     const likesButton = document.querySelectorAll('.like-button');
//     for (const like of likesButton) {
//       like.addEventListener("click", (event) => {
//         const likeIndex = like.dataset.index;
//         const commentsElement = comments[likeIndex];
//         event.stopPropagation();
   

//         if (commentsElement.likeComment) {
//           commentsElement.likesNumber -= 1;
//           commentsElement.likeComment = false;
//           commentsElement.propertyColorLike = 'like-button -no-active-like'; 
//           renderComments();
//         } else {
//           commentsElement.likesNumber += 1;
//           commentsElement.likeComment = true;
//           commentsElement.propertyColorLike = 'like-button -active-like'; 
//           renderComments();      
//         }
//       })
//     }
//   };

//   getLikeButton();
  
  
  




//   // кнопка «Написать» не кликабельна, если имя или текст в форме незаполненные.
//   buttonElement.setAttribute('disabled', true);

//   nameInputElement.addEventListener("input", () => {
//     buttonElement.setAttribute('disabled', true);
//     if ((nameInputElement.value.length > 0) && (textInputElement.value.length > 0)) {
//       buttonElement.removeAttribute('disabled');
//     }
//   });
//   textInputElement.addEventListener("input", () => {
//     buttonElement.setAttribute('disabled', true);

//     if ((nameInputElement.value.length > 0) && (textInputElement.value.length > 0)) {

//       buttonElement.removeAttribute('disabled');
//     }
//   });



//   buttonElement.addEventListener("click", () => {

//     buttonElement.setAttribute('disabled', true);






 






// // комментарий вводимый пользователем добавляем в массив
//     comments.push({
//       name: nameInputElement.value,
//       dateСreation: currentDate,
//       textComment: textInputElement.value,
//       likeComment: false,
//       likesNumber: 0,
//       propertyColorLike: 'like-button -no-active-like',
      

//     });
    
    
    
//     nameInputElement.value = "";
//     textInputElement.value = "";

// replyComment();
// renderComments();
// });


//     //Ответы на комментарии
// const replyComment = () => {
//   const userCommentElements = document.querySelectorAll(".comment");  
//   for ( const userCommentElement of userCommentElements) {
//     userCommentElement.addEventListener("click", () => {
//       textInputElement.value=userCommentElement.dataset.text;
//     })       
// }};

// replyComment();

// // HTML код через JS
// const renderComments = () => {

// const commentsHtml = comments.map((comment, index) => {   

// return `<li class="comment" data-text="${comment.textComment} - ${comment.name}">
//       <div class="comment-header">
        
//         <div>${comment.name
//           .replaceAll('&', '&amp;')
//           .replaceAll('<', '&lt;')
//           .replaceAll('>', '&gt;')
//           .replaceAll('"', '&quot;')}</div>
//         <div class="date">${comment.dateСreation}</div>
//       </div>
//       <div class="comment-body">
//         <div class="comment-text">
//           ${comment.textComment
//           .replaceAll('&', '&amp;')
//           .replaceAll('<', '&lt;')
//           .replaceAll('>', '&gt;')
//           .replaceAll('"', '&quot;')}
//           </div></div>
//       <div class="comment-footer">
//         <div class="likes">
//           <span class="likes-counter"> ${comment.likesNumber}</span>
//           <button data-index="${index}" class='${comment.propertyColorLike}'></button>

//         </div>
//       </div>
//     </li>`;
// }).join("");

// commentsElement.innerHTML = commentsHtml;

// getLikeButton();  
// replyComment();
// };

// renderComments();





// // формат даты
//   const currentDate = new Date().getDate().toString().padStart(2, '0') + '.' +
//     (new Date().getMonth() + 1).toString().padStart(2, '0') + '.' +
//     new Date().getFullYear().toString().slice(-2) + " " +
//     new Date().toLocaleTimeString().slice(0, -3);





//   //нажатие клавиши Enter должно вызывать ту же логику, которая срабатывает при клике на кнопку «Добавить».
//   document.addEventListener("keyup", function (enter) {
//     if (enter.keyCode == 13) {
//       buttonElement.click();
//     }
//   });

//   //удаление последнего комментари
//   buttonElementDel.addEventListener("click", () => {

//     comments.pop();

//     const lastElement = commentsElement.lastElementChild;
//     lastElement.remove();
//   });

//   console.log("It works!");
