<!DOCTYPE html>
<html>
  <head>
    <title>Проект "Комменты"</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="styles.css" />
  </head>
 
  <body>
    <div class="container">
      <div class="list-loader hidden">
        <span>Комментарии загружаются...</span>
      </div>
      <ul id="list" class="comments">

      </ul>
      <div class="add-form hidden">
        <input id="name-input"
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
        />
        <textarea id="comment-input"
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id="add-button" class="add-form-button " >Написать</button>
        </div>
      </div>
      <div class="comment-loader hidden">
        <span>Комментарий отправляется</span>
      </div>
    </div>
    
    
  </body>
  <style>
    .error {
      background-color:#EB7D7D;
    }
    .active-like {
      background-image: url("data:image/svg+xml,%3Csvg width='22' height='20' viewBox='0 0 22 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.95 0C14.036 0 12.199 0.882834 11 2.26703C9.801 0.882834 7.964 0 6.05 0C2.662 0 0 2.6267 0 5.99455C0 10.1035 3.74 13.4714 9.405 18.5613L11 20L12.595 18.5613C18.26 13.4714 22 10.1035 22 5.99455C22 2.6267 19.338 0 15.95 0Z' fill='%23BCEC30'/%3E%3C/svg%3E")
    }
  </style>

  <script>
    "use strict";
   

   const listElements = document.getElementById("list");
   const nameElement = document.querySelector('.add-form-name');
   const textElement = document.querySelector('.add-form-text');
   const buttonElements = document.querySelector('.add-form-button');
   const deleteButtonElement = document.querySelector('.delete-button');
   let comments = [];

   function hideAddForm (){
    const form = document.querySelector(".add-form");
    form.classList.add("hidden");
   }
   function showAddForm(){
    const form = document.querySelector(".add-form");
    form.classList.remove("hidden");
   }

   function showLoadingIndicatorComments() {
    const loader = document.querySelector(".comment-loader");
    loader.classList.remove("hidden");
   }
   function deleteLoadingIndicatorComments(){
    const loader = document.querySelector(".comment-loader");
      loader.classList.add("hidden");

   }

   function showLoadingIndicator() {
    const loader = document.querySelector(".list-loader");
    loader.classList.remove("hidden");
  
    }

    function deleteLoadingIndicator() {
      const loader = document.querySelector(".list-loader");
      loader.classList.add("hidden");
    }

   function correctDate(date) {
       let currentDate = new Date(date);
       let todayDay = currentDate.getDate();
       let todayMonth = currentDate.getMonth() + 1;
       let todayYear = String(currentDate.getFullYear()).slice(-2);
      let todayHours = currentDate.getHours();
      let todayMinutes = currentDate.getMinutes();
      todayDay = todayDay < 10 ? "0" + todayDay : todayDay;
      todayMonth = todayMonth < 10 ? "0" + todayMonth : todayMonth;
      todayHours = todayHours < 10 ? "0" + todayHours : todayHours;
       todayMinutes = todayMinutes < 10 ? "0" + todayMinutes : todayMinutes;

       let formattedDate = `${todayDay}.${todayMonth}.${todayYear} ${todayHours}:${todayMinutes} `;
       return formattedDate;
     }
   
   function getFetch() {
   showLoadingIndicator();
   hideAddForm();

   fetch('https://wedev-api.sky.pro/api/v1/alexandr-trankov/comments', {
    method: "GET"
     })
     .then((response) => response.json()) 
     .then((responseData) => {
          const appComment = responseData.comments.map((comment) => {
        
            return {
               name: comment.author.name,
               date: correctDate(comment.date),
               text: comment.text,
               likes: comment.likes,
               islike: false,
             }
           });
comments = appComment
renderElements();
deleteLoadingIndicator(); 
showAddForm();
}) 

}
getFetch();
function renderElements (){
  const commentsHTML = comments.map((element, index)=>{
        return `<li class="comment" data-index="${index}" >
        <div class="comment-header">
          <div>${element.name}</div>
          <div>${element.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${element.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${element.likes}</span>
            <button data-index="${index}" class="like-button ${element.islike ? "-active-like" : ""}"></button>
            
          </div>
        </div>
        <button data-index="${index}" class="add-form-button delete-button">Удалить</button>
      </li>`
      
    }).join("");
    list.innerHTML = commentsHTML;
    commentOnComment();
    deleteComment();
    addLike();
    addComment();
 }

function addLike () {
 
  const likeElements = document.querySelectorAll('.like-button');
  for(let like of likeElements) {
    like.addEventListener('click', (event) => { 
      event.stopPropagation();
      let index = like.dataset.index 
      let object = comments[index];
      if (object.islike){
        object.islike = false;
        object.likes --;
      } else {
        object.islike = true;
        object.likes ++;
      }
      renderElements();
    })
  }}
  
 function commentOnComment() {
    const commentOnComment = document.querySelectorAll('.comment');
     for(let comment of commentOnComment) {
     comment.addEventListener('click', () => {
       let index = comment.dataset.index
     let object = comments[index];
      commentInputElement.value = `${object.text}  ${object.name}`
     renderElements();
     })
    }
 }
    const buttonElement = document.getElementById("add-button");
    const listElement = document.getElementById("list");
    const nameInputElement = document.getElementById("name-input");
    const commentInputElement = document.getElementById("comment-input");
    const currentDate = new Date ().toLocaleString().slice(0, -3);
    

function addComment() {
  buttonElement.addEventListener('click', () => {
      nameInputElement.classList.remove("error");
      commentInputElement.classList.remove("error");
       if (nameInputElement.value === '' || commentInputElement.value === '') {
        nameInputElement.classList.add("error");
        commentInputElement.classList.add("error");
        return;
       }
       const nameInComment = nameElement.value 
       const textInComment = textElement.value
       showLoadingIndicatorComments();
       hideAddForm();
       fetch('https://wedev-api.sky.pro/api/v1/alexandr-trankov/comments', {
       method: "POST",
        body:JSON.stringify ({
       text: textInComment
        .replaceAll("<", "&lt")
        .replaceAll(">", "&gt")
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;"),
       name: nameInComment
        .replaceAll("<", "&lt")
        .replaceAll(">", "&gt")
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;"),
       })
       
  })
  .then(() => {
    deleteLoadingIndicatorComments();
    showAddForm();
      nameElement.value = "";
      textElement.value = "";
      getFetch();
      deleteLoadingIndicator();  
       })
      });
}

   function deleteComment () {
    const buttonDelete = document.querySelectorAll('.delete-button');
    for( let button of buttonDelete) {
      button.addEventListener('click', (event) => {
        let index = button.dataset.index
        comments.splice(index, 1);
        event.stopPropagation();
       renderElements();
      })
    }};
  </script>
</html>