import { getTodos, postTodo } from "./API.js";
import { renderData } from "./render.js";
export let token = "";
export function setToken(newToken) {
  token = newToken;
}
export function getToken() {
  return `Bearer ${token}`;
}
export let commentsArray = [];
export const apiGet = () => {
  getTodos().then((responseData) => {
    const fromApp = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        userLike: comment.isLiked,
        comment: comment.text,
        like: comment.likes,
        date: new Date(comment.date).toLocaleString(),
      };
    });
    commentsArray = fromApp;
    renderData();
    loadingElement.classList.add("hidden");
    titleAddElement.classList.add("titleAdd");
  });
};
apiGet();
renderData();
// const ulElement = document.getElementById("ul");
const loadingElement = document.querySelector(".commentsLoading");
const titleAddElement = document.querySelector(".titleAddComment");
