"use strict";
import { getCurrentDate } from "./date.js";
import { getList } from "./list.js";
import renderComments from "./renderComments.js";
import {getApp, getPost} from "./api.js";

    const commentLoadingElement = document.querySelector('.comment-loading');

    const formCommentElement = document.querySelector ('.add-form')
    export const inputNameElement = document.querySelector ('.add-form-name');
    export const inputTextElement = document.querySelector ('.add-form-text');
    const buttonElement = document.querySelector ('.add-form-button');
    export const commentElement = document.querySelector ('.comments');
    const currentDate = new Date().toLocaleDateString('default', { day: '2-digit', month: '2-digit', year: '2-digit' }) +
  " " + new Date().toLocaleTimeString().slice(0, -3);
    const buttontwoElement = document.getElementById ('buttontwo');
    const loadingElement = document.querySelector ('.page-loading');
    
    commentElement.innerHTML= 'Подождите, страница загружается!';


 
    function getFetchPromice () {
    return getApp().then ((responseData)=> {
    const appComments = responseData.comments.map ((comment)=>{
    return {
          name:comment.author.name,
          date: new Date().toLocaleDateString('default', {day: '2-digit', month: '2-digit', year: '2-digit'}) + " "+ new Date().toLocaleTimeString().slice(0,-3),
          textComment: comment.text,
          likesNumber: comment.likes,
          colorLikes: 'like-button  no-active-like',
          forceError: true,
      }
      });
      comments = appComments;
      renderComments(comments, getList);
      })
      .then ((response)=>{
        loadingElement.style.display= 'none';
      })
      .catch((error)=>{
      alert ('Кажется что-то пошло не так,попробуй позже');
      console.warn (error); 
      commentLoadingElement.classList.add ('comment-loading');
      formCommentElement.classList.remove ('comment-loading');   
      });
      };

    getFetchPromice();
 
    let comments = [];
    export function changeComment () {
    const textComments = document.querySelectorAll ('.comment');
    for (const textComment of textComments ) {
    textComment.addEventListener ('click',()=> {
    const textCommentIndex = textComment.dataset.index;
    inputTextElement.value =`${comments[textCommentIndex].name}:\n${comments[textCommentIndex].textComment}`;

    renderComments(comments, getList);
    });
    };  
    };
    changeComment ();

  export function getLikeButton () {
  const likesButtons = document.querySelectorAll (".like-button");
  for (const likeButton of likesButtons) {
  likeButton.addEventListener ('click',(event)=> {
  event.stopPropagation ();
  const likeButtonIndex =  likeButton.dataset.index;
  const commentsElement = comments [likeButtonIndex];
      if (commentsElement.likeComment) {
        commentsElement.likesNumber -=1;
        commentsElement.colorLikes = 'like-button  -no-active-like';
        commentsElement.likeComment = false;
      } else {
        commentsElement.likesNumber +=1;
        commentsElement.colorLikes = 'like-button  -active-like';
        commentsElement.likeComment = true;
      }
        renderComments(comments, getList);
      });
    }; 
   };
   renderComments(comments, getList);
   


    buttonElement.addEventListener("click", () => {

    commentLoadingElement.classList.remove ('comment-loading');
    formCommentElement.classList.add ('comment-loading');

      inputNameElement.style.backgroundColor = '';
          inputTextElement.style.backgroundColor = '';
    if (inputNameElement.value === '' && inputTextElement.value === '') {
      
        inputNameElement.style.backgroundColor = 'red';
          inputTextElement.style.backgroundColor = 'red';
          return;
        } else if (inputNameElement.value === '') {
        inputNameElement.style.backgroundColor = 'red';
          return;
        } else if (inputTextElement.value === '') {
       
          inputTextElement.style.backgroundColor = 'red';
          return;
        };  
    
    //   //Первое доп задание
    
    // buttonElement.addEventListener("click", () => {
   
    // if (inputNameElement.value ==='' && inputTextElement.value === '') {
    //     buttonElement.disabled = true;
    //     return;
    // } else if (inputNameElement.value!=='' && inputTextElement.value!=='') {
    //   buttonElement.disabled=false;
    //   return;
    // };

    // Второе доп задание
  //  document.addEventListener("keyup", function(enter) {
  // if (enter.keyCode == 13) {
  //   buttonElement.click();
  // }
// });

    //  buttonElement.disabled = true;
    //  buttonElement.textContent = 'Элемент добавляется...';
   
    return getPost().then((data)=>{
      return getFetchPromice();
     })
      .then ((data)=>{
      
      commentLoadingElement.classList.add ('comment-loading');
      formCommentElement.classList.remove ('comment-loading');
        
      inputNameElement.value="";
      inputTextElement.value="";   
    })
    .catch((error)=>{
        alert ('Кажется что-то пошло не так,попробуй позже');
        console.warn (error); 
      commentLoadingElement.classList.add ('comment-loading');
      formCommentElement.classList.remove ('comment-loading');
     
    });
  });