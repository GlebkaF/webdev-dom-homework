import { formatDateTime } from "./datetime.js";
import { getComments, getToken, setToken, token } from "./api.js";
import { initDeleteButtonsListeners } from "./delbutton.js";
import { renderComments, addComment, initLikeListener } from "./render.js";


export let user = JSON.parse(localStorage.getItem("user"));
export const setUser = (newUser) => {
  user = newUser;
};
/* console.log(user); */

/* const textAreaElement = document.getElementById("add-text");
const inputElement = document.getElementById("add-name");
const outerFormElement = document.getElementById("add-form");
const addFormElement = document.querySelector(".add-form"); */


//Прелоадер страницы

export let commentList = [];


// запрос коммента с api
export const fetchAndRenderComments = () => {
  getComments().then((responseData) => {
    commentList = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: formatDateTime(comment.date),
        id: comment.id,/*  */
        isLiked: comment.isLiked,
        likes: comment.likes,
        text: comment.text,
      };
    });
    console.log(commentList);
    renderComments();

    if (token) {
      initLikeListener();
      initDeleteButtonsListeners();
      const buttonElement = document.getElementById("add-form-button");
      buttonElement.disabled = false;
      
      addComment();
      
    }
  });


};
fetchAndRenderComments();

//Цитата коммента


/* initDeleteButtonsListeners(); */


//функция добавления коммента


