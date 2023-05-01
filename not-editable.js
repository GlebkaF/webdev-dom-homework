import { fetchComments } from "./api.js";
import { renderLike } from "./render.js";
import { listComment } from "./commentList.js";

const commentElement = document.querySelector(".comments");
const load = document.querySelector(".load");
const newLoad = commentElement.innerHTML;
let comments = [];
load.textContent = "Подождите, пожалуйста, комментарии загружаются...";

function fetch () {
    fetchComments()
    .then((responseData) => {
      load.innerHTML = newLoad;
          return comments = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            data: new Date(comment.date).toLocaleString(),
            text: comment.text,
            countLike: comment.likes,
            likeComment: false,
            isLoading: true,
          }
        })
      })
    .then((comments) => {
      renderLike(comments, commentElement, listComment);
    })
    .catch((err) => {
      alert("Кажется, у вас сломался интернет, попробуйте позже");
      console.warn(err);
    });
    };
    fetch();
  