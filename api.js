import {  commentsElement, fetchFunction} from "./index.js";
//import { nameInputElement, textElement} from "./render.js";
//import { fetchFunction } from "./index.js";
//import { commentDate } from "./date.js";
//import { token } from "./index.js";
//import { loaderComments } from "./index.js";
//import { addFormElement } from "./index.js";
const host = "https://wedev-api.sky.pro/api/v2/tanya-bulaeva/comments";

let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

export const getFetch = () => {
    return fetch(host,{
    method: "GET",
    headers: {
      Authorization: token
    }
    })
    .then((response) => {
      if (response.status === 401){
 //       password= prompt ("Введите верный пароль")
  //  getFetch();
    throw new Error ("Нет авторизации")
    }
   //  loaderComments();
    return  response.json();
})
    }
    


export const postFetch = () => {
    return fetch(host,
 {
  method: "POST",
  body: JSON.stringify({
    name:   nameInputElement.value,
    text: textElement.value,
   date: commentDate,
   likes: 0,
   token,
//    forceError: true,
      }),
      headers: {
        Authorization: token
      }
    }).then((response) => {
  if (response.status === 201){
 // addFormElement.classList.add('hide');
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
   return fetchFuncgettion();

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

/*export function loginUser({ login, password }) {
  return fetch("", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
};

export function registerUser({ login, password, name }) {
  return fetch("", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}
*/


