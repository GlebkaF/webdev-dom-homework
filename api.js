import { renderComments } from "./render.js";

const getComments = (date,Element) => {
    let currentDate = new Date();
const shortDate = (value) => {
  let date = new Date(value);
  let month = date.getMonth();
  let min = date.getMinutes();
  let hours = date.getHours();
  if (month < 10) month = "0" + month;
  if (hours < 10) hours = "0" + hours;
  if (min < 10) min = "0" + min;
  return `${date.getDate()}.${month}.${date.getFullYear()-2000} ${hours}:${min}`;
}
    return fetch("https://webdev-hw-api.vercel.app/api/v1/maxim/comments", {
 method: "GET",
}).then((response) => {
 if (response.status === 200) {
   return response.json()
 } else {
   throw new Error("Нет соединения с сервером, попробуйте позже")
 } 
}).then((responseData) => {
   const appComments = responseData.comments.map((comment) => {
     return {
         name: comment.author.name,
         date: shortDate(comment.date),
         text: comment.text,
         likeCounter: comment.likes,
         likeStatus: "",
     };
   });
   date = appComments;
   renderComments(appComments,Element);
 }).catch((error) => {
   if (error.message === "Failed to fetch") {
           alert("Кажется, у вас сломался интернет, попробуйте позже");
         } else { alert(error)}
       });
}
const checkAndAdd = (arrComments, element, disabledElement) => {
    const formElement = document.getElementById("form");
    const commentsElement = document.getElementById("comments");
    const userCommentElement = document.getElementById("userComment");
      const userNameElement = document.getElementById("userName");
    if (userNameElement.value === "" || userCommentElement.value === "") {
       disabledElement.disabled = true;
       setTimeout(() => disabledElement.disabled = false, 1000);
       return;}
       let oldForm = formElement.innerHTML;
      fetch("https://webdev-hw-api.vercel.app/api/v1/maxim/comments", {
          method: "POST",
          body: JSON.stringify({
            forceError: true,
            name: userNameElement.value,
            text: userCommentElement.value,})
        }).then((response) => {
          if (response.status === 201) {
            formElement.innerHTML = `<span style='text-align:center'>Коментарий добавляется...</span>`;
            return response.json()
          }
          if (response.status === 400) {
            throw new Error("Имя и коментарий должен содержать хотя бы 3 символа")
          } 
          if (response.status === 500) {
            throw new Error("500");
          }
        }).then((responseData) => {
            arrComments = responseData.comments;
            return getComments(arrComments, element);
          }).then(()=>{
            formElement.innerHTML = oldForm;
          }).catch((error) => {
            if (error.message === "Failed to fetch") {
              alert("Кажется, у вас сломался интернет, попробуйте позже");
              return
            }
            if (error.message === "500") {
              checkAndAdd(arrComments, element, disabledElement);
            } else { alert(error)}
          });
  
  }
  export { getComments, checkAndAdd };