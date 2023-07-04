import { fetchFunction} from "./index.js";
import { commentDate } from "./date.js";
const host = "https://wedev-api.sky.pro/api/v2/tanya-bulaeva/comments";


export const getFetch = (token) => {
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

   //   commentsElement.textContent = "Подождите, лента коммментариев загружается"; 
    return  response.json();
})
    }
    


export const postFetch = (nameInputElement, textElement,token,) => {
 // const addFormElement = document.querySelector('.add-form');

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
 //   addFormElement = document.getElementById('add-form');
 // addFormElement.classList.add('hide');
 //commentsElement.textContent = `Загрузка комментария`;

  return response.json();
 };
 if (response.status === 500){
   throw new Error ("Сервер сломался");
 };
 if  (response.status === 400){
   throw new Error  ("Плохой запрос")
 }; 
   }).then((responseData) => {
   return fetchFunction();

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


//https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md


export function loginUser({ login, password }) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
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
  return fetch("https://wedev-api.sky.pro/api/user", {
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



