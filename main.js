
import { getCurrentDate } from "./date.js";
import { getList } from "./list.js";
import renderApp from "./renderComments.js";
import {getApp} from "./api.js";
// import { getList } from "./list.js";

const commentsLoading = document.querySelector('.data-loading');
let comments = [];
// let token = null; 
// const commentLoadingElement = document.querySelector('.comment-loading');    
// appEl.innerHTML= 'Подождите, страница загружается!';

   export function getFetchPromice () {
    return getApp().then ((responseData)=> {
    const appComments = responseData.comments.map ((comment)=>{
    return {
          name:comment.author.name,
          dateСreation: getCurrentDate(new Date(comment.date)),
          text: comment.text,
          likeComment: comment.isLiked,
          likesNumber: comment.likes,
          colorLikes: 'like-button  no-active-like',
          // forceError: true,
      }
      });
      comments = appComments;
      return renderApp(comments, getList);
      })
      .then ((response) => {
        commentsLoading.style.display = 'none';
      })
      .catch((error) => {
        if (error.message === "Сервер сломался") {
          alert("Сервер сломался, попробуйте позже");
          getApp();
        } else if (error.message === "Нет авторизации") {          
            console.log(error);
          } else {
            alert('Кажется, у вас сломался интернет, попробуйте позже');
            console.log(error);
          }
      });
      };
  
    getFetchPromice();
 
