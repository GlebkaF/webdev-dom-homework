"use strict";
import renderComments from "./render.js";
import {getCommentsList } from "./getCommentsList.js";
import {getFetch, postFetch} from "./api.js";
const buttonElement = document.getElementById('add-form-button');
export const commentsElement = document.querySelector('.comments');
export const nameInputElement = document.getElementById('input-name');
export const textElement = document.querySelector('.add-form-text');
export const addFormElement = document.getElementById('add-form');



export function loaderComments (){
  commentsElement.textContent = "Подождите, лента коммментариев загружается"; 
}


//получить из хранилища данных 
export let  comments = [];

function fetchFunction (){
    return getFetch().then((responseData) => {
    
     const appComments  = responseData.comments.map ((comment) => {
        return {
    name: comment.author.name,
    dateCreation: commentDate,
     textElement: comment.text,
     likesNumber: comment.likes,
     isLiked: false,
       };
    });
    comments = appComments;
   return  renderComments(commentsElement, getCommentsList);
     }).catch(() => {
       alert ("Кажется что-то пошло не так, попробуйте позже");
    //console.warn (error);
     });
     };

fetchFunction();
loaderComments ();


//цитирование
export const quotation = () => {
let commentElements  = document.querySelectorAll ('.comment');
for (const commentElement of commentElements){
commentElement.addEventListener('click', () => {
const index = commentElement.dataset.index;
textElement.value =  `"${comments[index].name}:  ${comments[index].textElement}"\n`
    });
  };

};
quotation ();
renderComments(commentsElement, getCommentsList);

//лайки
export function likeCommentButton() {    

const likesButton = document.querySelectorAll('.like-button');

for (const like of likesButton) {
    like.addEventListener("click", (event) => {
    event.stopPropagation();
    const likeIndex = like.dataset.index;
    const commentsElement = comments[likeIndex];
            
    if (commentsElement.likeComment) {
      commentsElement.likesNumber -= 1;
      commentsElement.likeComment = false;
      commentsElement.propertyColorLike = 'like-button -no-active-like';           
    } else {
      commentsElement.likesNumber += 1;
      commentsElement.likeComment = true;
      commentsElement.propertyColorLike = 'like-button -active-like';                  
    }
    renderComments(commentsElement, getCommentsList);
     
  })
}

};
likeCommentButton();

//добавление новых комментариев по кнопке с сохранением в api
buttonElement.addEventListener ("click", () => {
  nameInputElement.style.background = '';
if (nameInputElement.value === "" ){
  nameInputElement.style.background = 'red';
  return;
 };

 textElement.style.background = '';
 if (textElement.value === ""){
    textElement.style.background = 'red';
    return;
 };
postFetch();
 //fetch("https://wedev-api.sky.pro/api/v1/tanya-bulaeva/comments",
 //{
  //method: "POST",
  //body: JSON.stringify({
  //      name:   nameInputElement.value,
  //      text: textElement.value,
   //     date: commentDate,
   //     likes: 0,
  //      forceError: true,
  //    })
  //  }).then((response) => {
  //if (response.status === 201){
  //addFormElement.classList.add('hide');
 // commentsElement.textContent = `Загрузка комментария`;
 // return response.json();
  //};
  //if (response.status === 500){
  //  throw new Error ("Сервер сломался");
  //};
  //if  (response.status === 400){
  //  throw new Error  ("Плохой запрос")
  //}; 

 //  }).then((responseData) => {
 //   return getFetch();
//}).then(() => {
//    nameInputElement.value = "";
 //   textElement.value = ''; 
//})
//.catch((error) => {
 //if (error.message === "Сервер сломался" ){
 // alert ("Сервер сломался, попробуйте позже");
 // return;
 //};
 //if (error.message === "Плохой запрос" ){
 // alert ("Имя и комментарий должны быть не короче 3 символов");
 // return;
 //}; 
 //alert ("Кажется что-то пошло не так, попробуйте позже");

//});


renderComments(commentsElement, getCommentsList);
})

renderComments(commentsElement, getCommentsList);

quotation();




    console.log("It works!");