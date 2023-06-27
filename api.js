
import { loaderComments , commentsElement, nameInputElement, textElement, addFormElement } from "./index.js";

import { commentDate } from "./date.js";

export const getFetch = () => {
    return fetch("https://wedev-api.sky.pro/api/v1/tanya-bulaeva/comments",{
    method: "GET"
    })
    .then((response) => {
     loaderComments();
    return  response.json();
})
    }
    

export const postFetch = () => {
    return fetch("https://wedev-api.sky.pro/api/v1/tanya-bulaeva/comments",
 {
  method: "POST",
  body: JSON.stringify({
        name:   nameInputElement.value,
        text: textElement.value,
       date: commentDate,
       likes: 0,
   //    forceError: true,
      })
    }).then((response) => {

  if (response.status === 201){
  addFormElement.classList.add('hide');
 commentsElement.textContent = `Загрузка комментария`;

  return response.json();
 };
 if (response.status === 500){
   throw new Error ("Сервер сломался");
 };
 if  (response.status === 400){
   throw new Error  ("Плохой запрос")
 }; 
   }).then((responseData) => {
   return getFetch();
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
}
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