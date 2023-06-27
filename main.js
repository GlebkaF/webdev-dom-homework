

import { getCurrentDate } from "./fullDate.js";
import { getFetchPromise, postFetchPromise } from "./API.js";
import { renderComments }  from "./render.js";
import { listComments } from "./listComments.js"
    
    const commentsLoading = document.querySelector('.loader');
    export const addFormElement = document.querySelector('.add-form');
    const buttonElement = document.getElementById('add-button');
    const listElement = document.getElementById("list");
    export const nameInputElement = document.getElementById("input-name");
    export const textInputElement = document.getElementById("textarea-text");
    export const commentsElement = document.querySelector('.comments');
    export const loaderLi = document.querySelector('.loader-li');
    

    let comments = [];

    export function getFetchFunction() {
      getFetchPromise().then((responseDate) => {
        const appComments = responseDate.comments.map ((comment) => {
          return{
           name: comment.author.name,
           text: comment.text,
           date: getCurrentDate(new Date(comment.date)),
           likes: comment.likes,
           activeLike: false,
           propertyColorLike: 'like-button -no-active-like',
          }
        });
         comments = appComments;
         renderComments( comments, listComments );
      })
      .then(() => {
         commentsLoading.style.display = 'none';
      })
    };
    
    getFetchFunction();
    

    export const replayToComment = () => {

      const oldComments = document.querySelectorAll('.comment');
      
      for (const oldElement of oldComments) {

        oldElement.addEventListener('click', () => {
          
          const indexComment = oldElement.dataset.index;
          
          textInputElement.value = `${comments[indexComment].name}: ${comments[indexComment].text}`;
          
        });
      };
    };

    replayToComment();

    export const initEventListeners = () => {

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
        renderComments( comments, listComments );

      });

    };

  };
    initEventListeners(); 

    // const renderComment = () => {
    //   const commentsHtml = comments.map((comment, index) => {
    //     return `<li class="comment" data-index="${index}">
    //     <div class="comment-header">
    //       <div>${comment.name
    //       .replaceAll("&", "&amp;")
    //       .replaceAll("<", "&lt;")
    //       .replaceAll(">", "&gt;")
    //       .replaceAll('"', "&quot;")}
    //       </div>
    //       <div>${comment.date}</div>
    //     </div>
    //     <div class="comment-body">
    //       <div class="comment-text">
    //         ${comment.text
    //       .replaceAll("&", "&amp;")
    //       .replaceAll("<", "&lt;")
    //       .replaceAll(">", "&gt;")
    //       .replaceAll('"', "&quot;")}
    //       </div>
    //     </div>
    //     <div class="comment-footer">
    //       <div class="likes">
    //         <span class="likes-counter">${comment.likes}</span>
    //         <button class="like-button ${comment.propertyColorLike}" data-index="${index}"></button>
    //       </div>
    //     </div>
    //   </li>`
    //   }).join('');

    //   listElement.innerHTML = commentsHtml;
    //   initEventListeners(); 
    //   replayToComment();
    // };

    renderComments( comments, listComments );
    
    

    buttonElement.addEventListener("click", () => {
    
    
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

      
      loaderLi.style.display = 'flex';
      addFormElement.style.display = 'none';

      postFetchPromise();
      renderComments( comments, listComments );
    });
    
    console.log("It works!");