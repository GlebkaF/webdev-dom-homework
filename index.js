import {renderComments, deleteLastComment, deleteComment, loaderCommentsElement } from "./formComments.js";
import { myDate, secureInput} from "./optionalFunction.js";

// export const buttonElement = document.querySelector('button.add-form-button');
export const listElement = document.querySelector('.comments');
// export const inputNameElement = document.querySelector('.add-form-name');
// export const textareaElement = document.querySelector('.add-form-text'); 
//export const loaderCommentsElement = document.getElementById('loaderComments');
// export const addFormElement = document.querySelector('.add-form')

//массив comments

export let comments = [];

//функция GET

let host = 'https://webdev-hw-api.vercel.app/api/v2/:natalvod/comments';

let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k"

export const getFetchPromise = () => {
  //loaderCommentsElement.classList.remove('-display-none');
  return fetch(host,{
    method: "GET",
    headers: {
      Authorization: token,
  }
  }).then((response) => {
    if (response.status === 200){
      return response.json();
     } else if (response.status === 401) {
        throw new Error("Нет авторизации");
    } else {
     throw new Error("Сервер сломался, попробуй позже")
    };
  }).then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: secureInput(comment.author.name),
        date: myDate(new Date(comment.date)),
        text: secureInput(comment.text),
        likes: comment.likes,
        isLike: false,
      };
    })
    comments = appComments;
    //loaderCommentsElement.classList.add('-display-none');
    renderComments(listElement);
  }).catch((error) => {
    alert('Сервер не работает, повторите попытку позже');
    console.warn(error);
  });
}

getFetchPromise();
renderComments(listElement)


//Функция POST

export const postFetchPromise = () => {
  
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      name: secureInput(inputNameElement.value),
      date: myDate(new Date),
      text: secureInput(textareaElement.value),
      likes: 0,
      isLike: false,
      forceError: false,
    }),
    headers: {
      Authorization: token,
  }
  }).then((response) => {

    if (response.status === 201){
       return response.json();
    } else if (response.status === 500) {
      alert('Сервер не работает, повторите попытку позже')
      throw new Error("Сервер сломался, попробуй позже")
     } else if (response.status === 400) {
      alert ('Имя и комментарий должны быть не короче 3 символов')
      throw new Error("Имя и комментарий короче 3 символов")
    }  
  }).then(() => {
    return getFetchPromise();
  })
}

//validateButton()
//initDisabledButtonElement()
deleteLastComment();
deleteComment();
getFetchPromise();
//pushEnter();
//pushNewComment();
renderComments(listElement);





