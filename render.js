import { renderComments } from "./script.js"
// функция Данные с сервера



export const fetchAndRenderTasks = () =>{
    return fetch("https://webdev-hw-api.vercel.app/api/v1/Kerimov-Evgeny/comments", {
     method: "GET"
   })
     .then((response) => {
        if (response.status === 500) {
         throw new Error("Сервер сломался, попробуй позже")};
        return response.json()
     })
   
     .then((responseData) => {
       comments = responseData.comments;
       waitLoadComments.style.display = "none";
       renderComments();
     })
   
     .catch((error) => {
       if (error.message === "Сервер сломался, попробуй позже") {
         alert('Сервер упал')
         return;
       }
   
   })
    
   
   }