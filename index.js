"use strict";
import renderComments from "./render.js";
import {getCommentsList } from "./getCommentsList.js";
import {getFetch, postFetch} from "./api.js";
import { commentDate } from "./date.js";
import { textElement } from "./render.js";
//export const buttonElement = document.getElementById('add-form-button');
export const commentsElement = document.querySelector('.comments');
//export const nameInputElement = document.getElementById('input-name');
//export const textElement = document.querySelector('.add-form-text');
export const addFormElement = document.getElementById('add-form');



renderComments()


//получить из хранилища данных 
export let  comments = [];
export function fetchFunction (){
     getFetch().then((responseData) => {
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
//fetchFunction();
//loaderComments ();

/*
//цитирование
export const quotation = () => {

let commentElements  = document.querySelectorAll ('.comment');
for (const commentElement of commentElements){
commentElement.addEventListener('click', (event) => {
//  event.stopPropagation();
const index = commentElement.dataset.index;
textElement.value =  `"${comments[index].name}:  ${comments[index].textElement}"\n`
    });
  };
};
quotation ();
*/