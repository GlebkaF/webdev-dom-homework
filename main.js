import { getComments } from "./api.js";
import { renderComments } from "./renderComments.js";
import { format } from "date-fns";
let comments = [];

function fetchAndRenderTasks() {
  getComments().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: format(new Date(comment.date), "dd/MM/yyyy hh:mm"),
        likes: comment.likes,
        isLiked: false,
        text: comment.text,
      };
    });

    comments = appComments;

    renderComments({ comments, fetchAndRenderTasks, name: window.userName });

    const containerPreloader = document.getElementById("container-preloader");
    containerPreloader.textContent = "";
  });
}

fetchAndRenderTasks();
