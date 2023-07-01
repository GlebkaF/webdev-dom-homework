import { getCurrentDate } from "./fullDate.js";
import { getFetchFunction } from "./main.js";
//import { getFetchFunction} from "./main.js";
import { renderApp } from "./render.js";

const host = "https://wedev-api.sky.pro/api/v2/ulyana-korotkova/comments";
let token = "Bearer c8bobwbo6g5g5k5o5s5w606gc8bobwbo";
//token = null;


const getFetchPromise = () => {

    return fetch(host,{
        method: "GET",
        headers: {
          Authorization: token,
        },
     })
     .then((response) => {
      if (response.status === 401) {
        throw new Error('Нет авторизации');
      }
      return response.json()
     })

}

const postFetchPromise = () => {
    const nameInputElement = document.getElementById("input-name");
    const textInputElement = document.getElementById("textarea-text");
    const loaderLi = document.querySelector('.loader-li');
    const addFormElement = document.querySelector('.add-form');
  
    fetch(host, {
    method: "POST",
    body: JSON.stringify({
      name: nameInputElement.value
       .replaceAll("&", "&amp;")
       .replaceAll("<", "&lt;")
       .replaceAll(">", "&gt;")
       .replaceAll('"', "&quot;"),
      text: textInputElement.value
       .replaceAll("&", "&amp;")
       .replaceAll("<", "&lt;")
       .replaceAll(">", "&gt;")
       .replaceAll('"', "&quot;"),
      date: getCurrentDate(new Date()),
      likes: 0,
      activeLike: false,
      propertyColorLike: 'like-button -no-active-like',
      //forceError: true,
    }),
    headers: {
      Authorization: token,
    },
  })
  .then((response) => {

    if (response.status === 500) {
      throw new Error("Сервер сломался");
    } else if (response.status === 400) {
      throw new Error("Плохой запрос");
    } else {
      return response.json();
    }
  })
    .then(() => {
        return getFetchFunction();
    })
    .then(() => {
      loaderLi.style.display = 'none';
      addFormElement.style.display = 'flex';
      nameInputElement.value = '';
      textInputElement.value = '';
    })
    .catch((error) => {

      if (error.message === "Сервер сломался") {
        alert("Сервер сломался, попробуйте позже");
        postData(postFetchPromise);
      } else if (error.message === "Плохой запрос") {
        alert("Имя и комментарий должны быть не короче 3 символов");

      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
        console.log(error);
      }
      loaderLi.style.display = 'none';
      addFormElement.style.display = 'flex';
    });
    
}

export {getFetchPromise, postFetchPromise };