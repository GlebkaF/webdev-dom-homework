import { getCurrentDate } from "./fullDate.js";   
    
    const commentsLoading = document.querySelector('.loader');
    const addFormElement = document.querySelector('.add-form');
    const buttonElement = document.getElementById('add-button');
    const listElement = document.getElementById("list");
    const nameInputElement = document.getElementById("input-name");
    const textInputElement = document.getElementById("textarea-text");
    const commentElement = document.querySelectorAll('.comment');
    
    

    let comments = [];

    const getFetchPromise = () => {
     return fetch('https://wedev-api.sky.pro/api/v1/ulyana-korotkova/comments',{
       method: "GET"
       })
      .then((response) => {
         return response.json()
      })
      .then((responseDate) => {
        const appComments = responseDate.comments.map ((comment) => {
          return{
           name: comment.author.name,
           text: comment.text,
           date: getCurrentDate(new Date(comment.date)),
           likes: comment.likes,
           activeLike: false,
           propertyColorLike: 'like-button -no-active-like',
          }
        })
         comments = appComments;
         renderComment();
      })
      .then(() => {
         commentsLoading.style.display = 'none';
      })
    };
  
    getFetchPromise();
    

    const replayToComment = () => {

      const oldComments = document.querySelectorAll('.comment');
      
      for (const oldElement of oldComments) {

        oldElement.addEventListener('click', () => {
          
          const indexComment = oldElement.dataset.index;
          
          textInputElement.value = `${comments[indexComment].name}: ${comments[indexComment].text}`;
          
        });
      };
    };

    replayToComment();

    const initEventListeners = () => {

    const likeBtn = document.querySelectorAll('.like-button');

    for (const likeElement of likeBtn) {

      likeElement.addEventListener('click', (event) => {
        event.stopPropagation();

        const index = likeElement.dataset.index;
        const commentElement = comments[index];

        if (commentElement.activeLike) {
          commentElement.likes -= 1;
          commentElement.activeLike = false;
          commentElement.propertyColorLike = 'like-button -no-active-like'; 
        
        } else {
          commentElement.likes += 1;
          commentElement.activeLike = true;
          commentElement.propertyColorLike = 'like-button -active-like';

        }
        renderComment();

      });

    };

  };
    initEventListeners(); 

    const renderComment = () => {
      const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")}
          </div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${comment.propertyColorLike}" data-index="${index}"></button>
          </div>
        </div>
      </li>`
      }).join('');

      listElement.innerHTML = commentsHtml;
      initEventListeners(); 
      replayToComment();
    };

    renderComment();

    

    buttonElement.addEventListener("click", () => {
    
      const oldListHtml = listElement.innerHTML;
    
      nameInputElement.style.backgroundColor = '';
      if (nameInputElement.value === "") {
        nameInputElement.style.backgroundColor = 'red';
        return;
      }
    
      textInputElement.style.backgroundColor = '';
      if (textInputElement.value === "") {
        textInputElement.style.backgroundColor = 'red';
        return;
      };

      const loaderLi = document.querySelector('.loader-li');
      loaderLi.style.display = 'flex';
      addFormElement.style.display = 'none';

      
        fetch('https://wedev-api.sky.pro/api/v1/ulyana-korotkova/comments', {
        method: "POST",
        body: JSON.stringify({
          name: nameInputElement.value
           .replaceAll("&", "&amp;")
           .replaceAll("<", "&lt;")
           .replaceAll(">", "&gt;")
           .replaceAll('"', "&quot;"),
          text: textInputElement.value
           .replaceAll("&", "&amp;")
           .replaceAll("<", "&lt;")
           .replaceAll(">", "&gt;")
           .replaceAll('"', "&quot;"),
          date: getCurrentDate(new Date()),
          likes: 0,
          activeLike: false,
          propertyColorLike: 'like-button -no-active-like',
          //forceError: true,
        })
      })
      .then((response) => {

        if (response.status === 500) {
          throw new Error("Сервер сломался");
        } else if (response.status === 400) {
          throw new Error("Плохой запрос");
        } else {
          return response.json();
        }
      })
      .then((response) => {

        return getFetchPromise();
      })
      .then((response) => {

        loaderLi.style.display = 'none';
        addFormElement.style.display = 'flex';
        nameInputElement.value = '';
        textInputElement.value = '';
      })
      .catch((error) => {

        if (error.message === "Сервер сломался") {
          alert("Сервер сломался, попробуйте позже");

        } else if (error.message === "Плохой запрос") {
          alert("Имя и комментарий должны быть не короче 3 символов");

        } else {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
          console.log(error);
        }
        loaderLi.style.display = 'none';
        addFormElement.style.display = 'flex';
      });
    });

      
    console.log("It works!");