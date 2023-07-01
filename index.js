"use strict";
import renderComments from "./render.js";
import {getCommentsList } from "./getCommentsList.js";
import {getFetch, postFetch} from "./api.js";
import { commentDate } from "./date.js";
import {nameInputElement, textElement} from "./render.js"
//export const buttonElement = document.getElementById('add-form-button');
export const commentsElement = document.querySelector('.comments');
//export const nameInputElement = document.getElementById('input-name');
//export const textElement = document.querySelector('.add-form-text');
//export const addFormElement = document.getElementById('add-form');


export let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;

//export function loaderComments (){
//  commentsElement.textContent = "Подождите, лента коммментариев загружается"; 
//}


//получить из хранилища данных 
export let  comments = [];

export function fetchFunction (){
     getFetch({token}).then((responseData) => {
        const appComments  = responseData.comments.map ((comment) => {
        return {
    name: comment.author.name,
    dateCreation: commentDate,
     textElement: comment.text,
     likesNumber: comment.likes,
     isLiked: false,
     propertyColorLike: '',
       };
    });
    comments = appComments;
    renderComments(commentsElement, getCommentsList);
     }).catch((error) => {
   //   alert ("Кажется что-то пошло не так, попробуйте позже");
    console.log (error);
     });
     };

fetchFunction();
//loaderComments ();


//цитирование
export const quotation = () => {
let commentElements  = document.querySelectorAll ('.comment');
for (const commentElement of commentElements){
commentElement.addEventListener('click', (event) => {
const index = commentElement.dataset.index;
textElement.value =  `"${comments[index].name}:  ${comments[index].textElement}"\n`
    });
  };

};
quotation ();

postFetch({
      name:   nameInputElement.value,
      text: textElement.value,
      date: commentDate,
      likes: 0,
      token,
   //    forceError: true,
}).then(() => {
  nameInputElement.value = "";
 textElement.value = ''; 
})
.catch((error) => {
if (error.message === "Сервер сломался" ){
alert ("Сервер сломался, попробуйте позже");
return;
};
if (error.message === "Плохой запрос" ){
alert ("Имя и комментарий должны быть не короче 3 символов");
return;
}; 
alert ("Кажется что-то пошло не так, попробуйте позже");
console.log (error)
});
renderComments();
postFetch();






    console.log("It works!");