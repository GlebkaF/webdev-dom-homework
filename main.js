import { format } from "./node_modules/date-fns/format.mjs";
import { formatDateTime } from "./datetime.js";
import { getComments, getToken, setToken, token } from "./api.js";
import { initDeleteButtonsListeners } from "./delbutton.js";
import { renderComments, addComment, initLikeListener } from "./render.js";


export let user = JSON.parse(localStorage.getItem("user"));
export const setUser = (newUser) => {
  user = newUser;
};
/* console.log(user); */


//Прелоадер страницы

export let commentList = [];

const now = new Date();
const createDate = format(now, "yyyy-MM-dd hh.mm.ss"); 
// запрос коммента с api
export const fetchAndRenderComments = () => {
  getComments().then((responseData) => {
    commentList = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: createDate,
        id: comment.id,
        isLiked: comment.isLiked,
        likes: comment.likes,
        text: comment.text,
      };
    });
    console.log(commentList);
    renderComments();

    if (token) {
      const buttonElement = document.getElementById("add-form-button");
      buttonElement.disabled = false;
      
      initLikeListener();
      initDeleteButtonsListeners();
      addComment();
      renderComments();
    }
  });


};
fetchAndRenderComments();

//Цитата коммента


/* initDeleteButtonsListeners(); */


//функция добавления коммента


