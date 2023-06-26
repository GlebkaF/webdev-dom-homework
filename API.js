import { getCurrentDate } from "./fullDate.js";
import { nameInputElement, textInputElement } from "./main.js";


const getFetchPromise = () => {

    return fetch('https://wedev-api.sky.pro/api/v1/ulyana-korotkova/comments',{
      method: "GET",
      })
     .then((response) => {
        return response.json()
     })
    
};

const postFetchPromise = () => {

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
};

export { getFetchPromise, postFetchPromise };