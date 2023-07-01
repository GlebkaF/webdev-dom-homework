import { getCurrentDate } from "./fullDate.js";
import { getFetchFunction} from "./main.js";



const getFetchPromise = () => {

    return fetch('https://wedev-api.sky.pro/api/v1/ulyana-korotkova/comments',{
      method: "GET",
      })
     .then((response) => {
        return response.json()
     })
    
}

const postFetchPromise = () => {
  const nameInputElement = document.getElementById("input-name");
  const textInputElement = document.getElementById("textarea-text");
  const loaderLi = document.querySelector('.loader-li');
  const addFormElement = document.querySelector('.add-form');

  
    fetch('https://wedev-api.sky.pro/api/v1/ulyana-korotkova/comments', {
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
    })
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

export { getFetchPromise, postFetchPromise };