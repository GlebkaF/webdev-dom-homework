"use strict";

import renderUsers from "./render.js";
import getCommentDate from "./commentDate.js";

const getFetchPromise = (element, callback, object, comment) => {
    return fetch("https://wedev-api.sky.pro/api/v1/NastyaTsyf/comments", {
   method: "GET"
   })
     .then((response) => {
       if (response.status === 500) {
         throw new Error("Сервер сломался");
       } else {
         return response.json();
       }
     })
     .then((responseData) => {
       const appComments = responseData.comments.map((comment) => {
         return {
           name: comment.author.name,
           date: getCommentDate(comment.date),
           text: comment.text,
           likes: comment.likes,
           isLiked: comment.isLiked,
         }
       })
       object = appComments;
       console.log(object);
       renderUsers(element, callback, object, comment);
     })
     .catch((error) => {
       if (error.message === "Сервер сломался") {
         alert("Сервер сломался, попробуй позже");
         console.log(error);
         return;
       } else {
         alert("Кажется, у вас сломался интернет, попробуйте позже");
         console.log(error);
         return;
       }
     });
 }

const addComment = (nameText, commentText) => {
    return fetch("https://wedev-api.sky.pro/api/v1/NastyaTsyf/comments", {
      method: "POST",
      body: JSON.stringify({
        name: nameText.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
        date: new Date(),
        text: commentText.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
        likes: 0,
        isLiked: false
      })
    })  
  }


export { getFetchPromise, addComment };
