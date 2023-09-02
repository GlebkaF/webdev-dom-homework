import { getTodos, postTodo, login, regLogin } from "./api.js";
import { renderComments } from "./renderComments.js";
import { getCurrentDate } from "./getCurrentDate.js";
import { renderLogin } from "./renderlogin.js";

export let comments = [];

export const clickLike = (event) => {
  event.stopPropagation();
  const index = event.target.dataset.index;
  const comment = comments[index];
  if (!comment.active) {
    comment.active = true;
    comment.like++;
  } else {
    comment.active = false;
    comment.like--;
  }
  renderComments({ comments, clickLike });
};

export const getDateApi = () => {
  getTodos().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: comment.date,
        text: comment.text,
        like: comment.likes,
        active: false,
        isEdit: false,
      };
    });

    comments = appComments;

    renderComments({ comments, clickLike });
  });
};

// renderLogin({ getDateApi });
//  renderComments({ comments, clickLike, renderLogin });
getDateApi();
