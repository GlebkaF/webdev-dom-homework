import { getComments } from "./api.js";
import { renderComments } from "./renderComments.js";

let comments = [];

const RUDate = Intl.DateTimeFormat();

function fetchAndRenderTasks() {
  getComments().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: RUDate.format(new Date(comment.date)),
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
