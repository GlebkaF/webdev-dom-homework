"use strict";
import renderComments from "./render.js";
import {getCommentsList } from "./getCommentsList.js";
import {getFetch, postFetch} from "./api.js";
import { commentDate } from "./date.js";
import { textElement } from "./render.js";

import { commentsElement } from "./render.js";


//получить из хранилища данных 
export let  comments = [];
let token = null;
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
   renderComments({commentsElement, getCommentsList});
     }).catch((error) => {
   //   alert ("Кажется что-то пошло не так, попробуйте позже");
    console.log (error);
     });
     };
fetchFunction();
//loaderComments ();

