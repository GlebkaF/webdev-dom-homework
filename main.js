import { formatDateTime } from "./datetime.js";
import { getComments, postComment, loginPost,getToken, token} from "./api.js";
import { initDeleteButtonsListeners } from "./delbutton.js";
import { renderComments} from "./render.js";
  
export let user = null;
export const setUser = (newUser) => {
    user = newUser;
};
console.log(user);

/* const textAreaElement = document.getElementById("add-text");
const inputElement = document.getElementById("add-name");
const outerFormElement = document.getElementById("add-form");
const addFormElement = document.querySelector(".add-form"); */


//Прелоадер страницы

export let commentList = [];

/* export const fetchAndRenderComments = (comments) => {
    getComments({ token: setToken() })
      .then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
          return {
            id: comment.id,
            name: comment.author.name,
            date: formatDateTime(comment.date),
            text: comment.text,
            likes: comment.likes,
            isLiked: comment.isLiked,
          };
        });
        console.log("fetchAndRende работает")
        comments = appComments;
        renderComments(comments);
      });
  }; */
 

// запрос коммента с api
export const fetchAndRenderComments = () => {
    getComments().then((responseData) => {
        commentList = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                date: formatDateTime(comment.date),
                id: comment.id,
                isLiked: comment.isLiked,
                likes: comment.likes,
                text: comment.text,
            };
        });
        console.log(commentList);
        renderComments();

        if (getToken(token)) {
            addComment();
            const buttonElement = document.getElementById("add-form-button");
            buttonElement.disabled = false;
        }
    });
    
};

fetchAndRenderComments();




//Цитата коммента


initDeleteButtonsListeners();


//функция добавления коммента


